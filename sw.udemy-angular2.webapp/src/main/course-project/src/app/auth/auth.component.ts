import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthServiceResponse } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit {

    loginForm: FormGroup;
    loginMode = true;
    loading = false;
    error = null;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            "email": new FormControl(null, [ Validators.required, Validators.email ]),
            "password": new FormControl(null, Validators.minLength(6)),
        });
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
            }
        );
    }

}
