import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                // NB. user == null for initial login requests

                let newRequest = request;
                if (user) {
                    newRequest = request.clone({
                        params: new HttpParams().set("auth", user.token)
                    });
                }

                return next.handle(newRequest);
            })
        );
    }

}