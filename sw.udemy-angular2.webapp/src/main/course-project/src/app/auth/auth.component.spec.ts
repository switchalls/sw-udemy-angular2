import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AuthComponent } from './auth.component'
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('AuthComponent', () => {
    let store: MockStore;

    let initialState = {
        auth: {
            user: null,
            loginError: null,
            loginRunning: false
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AuthComponent
            ],
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                provideMockStore({
                    initialState: initialState
                }),
                AuthService
            ]
        });

        store = TestBed.inject(MockStore);
    });

    it ('should create application', () => {
        let fixture = TestBed.createComponent(AuthComponent);
        let app = fixture.debugElement.componentInstance; // AuthComponent instance
        expect(app).toBeTruthy();
    });

    it ('should render form', () => {
        let fixture = TestBed.createComponent(AuthComponent);
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;

        let emailLabel = compiled.querySelector("label[for=email]");
        expect(emailLabel.textContent).toBe('Email: ');

        let passwordLabel = compiled.querySelector("label[for=password]");
        expect(passwordLabel.textContent).toBe('Password: ');
    });

    it ('should render buttons for login', () => {
        let fixture = TestBed.createComponent(AuthComponent);
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;

        let submitButton = compiled.querySelector("button[type=submit]");
        expect(submitButton.textContent).toBe('Login');

        let modeButton = compiled.querySelector("button[type=button]");
        expect(modeButton.textContent).toBe('Switch to Sign Up');
    });

    it ('should render buttons for sign-up', () => {
        let fixture = TestBed.createComponent(AuthComponent);

        let app = fixture.debugElement.componentInstance;
        app.loginMode = false;

        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;

        let submitButton = compiled.querySelector("button[type=submit]");
        expect(submitButton.textContent).toBe('Sign Up');

        let modeButton = compiled.querySelector("button[type=button]");
        expect(modeButton.textContent).toBe('Switch to Login');
    });
})