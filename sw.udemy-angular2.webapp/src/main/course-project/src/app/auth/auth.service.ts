import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User, StoredUser } from './user.model';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment'

export interface AuthServiceResponse {
   idToken:      string;
   email:        string;
   refreshToken: string;
   expiresIn:    string;
   localId:      string;
   registered?:  boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    private accountsUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts";

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthServiceResponse>(this.accountsUrl + ':signUp?key=' + environment.firebaseKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.firebaseErrorHandler),
            tap(response => {
                this.addLoginDetails(response);
            })
        );
    }

    signInWithPassword(email: string, password: string) {
        return this.http.post<AuthServiceResponse>(this.accountsUrl + ':signInWithPassword?key=' + environment.firebaseKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.firebaseErrorHandler),
            tap(response => {
                this.addLoginDetails(response);
            })
        );
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem("userData");
        this.router.navigate(["/login"]);
    }

    autoSignIn() {
        const storedUser: StoredUser = JSON.parse(localStorage.getItem("userData"));

        if (storedUser) {
            const restoredUser = new User(
                storedUser.email,
                storedUser.id,
                storedUser._token,
                new Date(storedUser._expiryDate));

            if (!restoredUser.isExpired()) {
                this.user.next(restoredUser);
            }
        }
    }

    private addLoginDetails(response: AuthServiceResponse) {
        const newUser = new User(
            response.email,
            response.idToken,
            response.idToken,
            this.getExpiryDate(+response.expiresIn));

        this.user.next(newUser);

        localStorage.setItem("userData", JSON.stringify(newUser));
    }

    private getExpiryDate(seconds: number): Date {
        const newDate = new Date();
        newDate.setSeconds(new Date().getSeconds() + seconds);
        return newDate;
    }

    private firebaseErrorHandler(errorResponse: HttpErrorResponse) {
        let errorMessage = "Unknown firebase error code";

        switch (errorResponse.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = "There is no user record corresponding to this identifier.";
                break;

            case 'INVALID_PASSWORD':
                errorMessage = "The password is invalid or the user does not have a password.";
                break;

            case 'USER_DISABLED':
                errorMessage = "The user account has been disabled by an administrator.";
                break;

            case 'EMAIL_EXISTS':
                errorMessage = "The email address is already in use by another account.";
                break;

            case 'OPERATION_NOT_ALLOWED':
                errorMessage = "Password sign-in is disabled for this project.";
                break;

            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
                break;
       }

        return throwError(errorMessage);
    }

}