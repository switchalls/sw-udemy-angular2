import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AuthService, AuthServiceResponse } from './auth.service';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';

import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.reducer';

@Component({
    selector:    'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls:   [ 'auth.component.css' ],
    animations: [
        trigger('spinnerAnimations', [
            state('hidden', style({
                opacity: 0,
                visibility: 'hidden'
            })),
            state('visible', style({
                opacity: 0.5,
                visibility: 'visible'
            })),
            transition('hidden => visible', animate(150)),
            transition('visible => hidden', animate(0))
        ])
    ]
})
export class AuthComponent implements OnInit, OnDestroy {

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    spinnerState = 'hidden';
    loginForm: FormGroup;
    loginMode = true;
    loading = false;
    error = null;

    private closedSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            "email": new FormControl(null, [ Validators.required, Validators.email ]),
            "password": new FormControl(null, Validators.minLength(6)),
        });

        this.store.select('auth').subscribe(authData => {
            this.loading = authData.loginRunning;
            this.error = authData.loginError;

            if (!this.loading) {
                this.spinnerState = 'hidden';
            }

            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    ngOnDestroy() {
        if (this.closedSubscription) {
            this.closedSubscription.unsubscribe();
        }
    }

    onSwitchMode() {
        this.loginMode = !this.loginMode;
    }

    onSubmit() {
        this.spinnerState = 'visible';
        this.loading = true;

        let authObersvable: Observable<AuthServiceResponse> = null;
        if (this.loginMode) {
/*
            authObersvable = this.authService.signInWithPassword(
                this.loginForm.value.email,
                this.loginForm.value.password);
*/

            this.store.dispatch(new AuthActions.LoginRequested({
                email:    this.loginForm.value.email,
                password: this.loginForm.value.password
            }));

        } else {
            authObersvable = this.authService.signUp(this.loginForm.value.email, this.loginForm.value.password);
        }

        if (authObersvable) {
            authObersvable.subscribe(
                response => {
                    this.onLoadingStopped(null);
                    this.router.navigate(["/recipes"]);
                },
                errorMessage => {
                    this.onLoadingStopped(errorMessage);
                    this.showErrorAlert(errorMessage);
                }
            );
        }
    }

    onLoadingStopped(errorMessage: string) {
        this.spinnerState = 'hidden';
        this.loading = false;
        this.error = errorMessage;
   }

    onAlertClosed() {
        // inform the store to clear any errors
        this.store.dispatch(new AuthActions.LoginReset());

/*
        this.error = null;
*/
    }

    private showErrorAlert(errorMessage: string) {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent
        );

        const viewContainerRef = this.alertHost.viewContainerRef;

        viewContainerRef.clear(); // remove anything that has been rendered

        const newAlert = viewContainerRef.createComponent(alertComponentFactory);

        newAlert.instance.message = errorMessage;

        this.closedSubscription = newAlert.instance.closed.subscribe( () => {
            // unsubscribe to avoid memory leaks
            this.closedSubscription.unsubscribe();

            // close newAlert
            viewContainerRef.clear();
        });
    }

}
