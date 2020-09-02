import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthServiceResponse } from '../auth.service';
import * as AuthActions from './auth.actions';

import { environment } from '../../../environments/environment'
import { User } from '../user.model';

const accountsUrl = "https://identitytoolkit.googleapis.com/v1/accounts";

@Injectable()
export class AuthEffects {

    // NB. Angular auto subscribes to this.actions observables

    @Effect()
    loginRequestedEffect = this.actions.pipe(
        ofType(AuthActions.LOGIN_REQUESTED),
        switchMap( (action: AuthActions.LoginRequested) => {
            return this.http
                .post<AuthServiceResponse>(accountsUrl + ':signInWithPassword?key=' + environment.firebaseKey, {
                    email: action.payload.email,
                    password: action.payload.password,
                    returnSecureToken: true})
                .pipe(
                    map(responseData => {
                        return new AuthActions.UserSignedIn({
                            email:      responseData.email,
                            userId:     responseData.localId,
                            token:      responseData.idToken,
                            expiryDate: this.getExpiryDate(+responseData.expiresIn)
                        });
                    }),
                    catchError(error => {
                        // effects must always return an observable.
                        // Use of() to create replacement observable

                        return of(new AuthActions.LoginFailed({
                            email:        action.payload.email,
                            errorMessage: this.getErrorMessage(error)
                        }));
                    })
                );
        })
    );

    @Effect({dispatch: false})
    userSignedInEffect = this.actions.pipe(
        ofType(AuthActions.USER_SIGNED_IN),
        tap( (action: AuthActions.UserSignedIn) => {
            const newUser = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expiryDate);

            localStorage.setItem("userData", JSON.stringify(newUser));

            this.router.navigate(['/recipes']);
        })
    );

    @Effect({dispatch: false})
    userSignedOutEffect = this.actions.pipe(
        ofType(AuthActions.USER_SIGNED_OUT),
        tap( (action: AuthActions.UserSignedOut) => {
            localStorage.removeItem("userData");

            this.router.navigate(['/login']);
        })
    );

    constructor (private actions: Actions, private http: HttpClient, private router: Router) {
    }

    private getErrorMessage(errorResponse: HttpErrorResponse) {
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

        return errorMessage;
    }

    private getExpiryDate(seconds: number): Date {
        const newDate = new Date();
        newDate.setSeconds(new Date().getSeconds() + seconds);
        return newDate;
    }

}
