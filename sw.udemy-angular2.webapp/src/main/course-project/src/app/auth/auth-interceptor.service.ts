import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { take, exhaustMap, map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
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