import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService, AuthServiceResponse } from './auth.service';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    loginForm: FormGroup;
    loginMode = true;
    loading = false;
    error = null;

    private closedSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            "email": new FormControl(null, [ Validators.required, Validators.email ]),
            "password": new FormControl(null, Validators.minLength(6)),
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
        this.loading = true;

        let authObersvable: Observable<AuthServiceResponse>;
        if (this.loginMode) {
            authObersvable = this.authService.signInWithPassword(this.loginForm.value.email, this.loginForm.value.password);
        } else {
            authObersvable = this.authService.signUp(this.loginForm.value.email, this.loginForm.value.password);
        }

        authObersvable.subscribe(
            response => {
                this.error = null;
                this.loading = false;
                this.router.navigate(["/recipes"]);
            },
            errorMessage => {
                this.error = errorMessage;
                this.loading = false;
                this.showErrorAlert(errorMessage);
            }
        );
    }

    onAlertClosed() {
        this.error = null;
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
