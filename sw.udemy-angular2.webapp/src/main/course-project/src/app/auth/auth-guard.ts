import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private store: Store<fromApp.AppState>) {
    }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) : Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                if (authState.user) {
                    return true;
                }

                // auto redirect user to "login" page when not authenticated'

                return this.router.createUrlTree(["/login"]);
            })
        );
    }

}