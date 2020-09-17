import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AlertComponent } from '../shared/alert/alert.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner';
import { PlaceholderDirective } from '../shared/placeholder.directive';

import { RecipesComponent } from '../recipes/recipes.component';

import * as AuthActions from './store/auth.actions';
import { AuthComponent } from './auth.component'
import { AuthServiceResponse } from './auth.service';

const firebaseSignUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUw0zMxJHT2_zv1do50pRpB2daGxCpPa8`;

describe('AuthComponent', () => {
    let mockHttpClient: HttpTestingController;
    let mockStore: MockStore;
    let mockDate: Date;

    let location: Location;

    let fixture: ComponentFixture<AuthComponent>;
    let component: AuthComponent;
    let compiled: any;

    let initialState = {
        auth: {
            loginError: null,
            loginRunning: false
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AlertComponent,
                AuthComponent,
                LoadingSpinnerComponent,
                PlaceholderDirective
            ],
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                    { path: 'recipes', component: RecipesComponent },
                ]),
            ],
            providers: [
                provideMockStore({
                    initialState: initialState
                })
            ]
        });

        mockDate = new Date('2020-01-01');
        jasmine.clock().mockDate(mockDate);

        mockHttpClient = TestBed.inject(HttpTestingController);
        mockStore = TestBed.inject(MockStore);

        location = TestBed.get(Location);

        fixture = TestBed.createComponent(AuthComponent);
        fixture.detectChanges();

        component = fixture.debugElement.componentInstance
        compiled = fixture.debugElement.nativeElement;
    });

    it ('should create application', () => {
        expect(component).toBeTruthy();
    });

    it ('should render form', () => {
        let emailLabel = compiled.querySelector("label[for=email]");
        expect(emailLabel.textContent).toBe('Email: ');

        let passwordLabel = compiled.querySelector("label[for=password]");
        expect(passwordLabel.textContent).toBe('Password: ');
    });

    it ('should render buttons for login', () => {
        let submitButton = compiled.querySelector("button[type=submit]");
        expect(submitButton.textContent).toBe('Login');

        let modeButton = compiled.querySelector("button[type=button]");
        expect(modeButton.textContent).toBe('Switch to Sign Up');
    });

    it ('should render buttons for sign-up', () => {
        switchLoginModel(fixture);

        let submitButton = compiled.querySelector("button[type=submit]");
        expect(submitButton.textContent).toBe('Sign Up');

        let modeButton = compiled.querySelector("button[type=button]");
        expect(modeButton.textContent).toBe('Switch to Login');
    });

    it ('should request login', async(() => {
        let dispatchSpy = spyOn(mockStore, 'dispatch');

        setEmail(fixture, "test@test.com");
        setPassword(fixture, "1234");
        submitForm(fixture);

        fixture.whenStable().then(() => {
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                new AuthActions.LoginRequested({
                    email:    'test@test.com',
                    password: '1234'
                })
            );

            expect(component.error).toBe(null);
            expect(component.loading).toBe(true);
            expect(component.spinnerState).toBe('visible');
        });
    }));

    it ('should stop loading when login finished', () => {
        component.loading = true;
        component.spinnerState = 'visible';

        fixture.detectChanges();

        mockStore.setState({
            auth: {
                loginError: null,
                loginRunning: false
            }
        });

        expect(component.error).toBe(null);
        expect(component.loading).toBe(false);
        expect(component.spinnerState).toBe('hidden');
    });

    it ('should display login error', async(() => {
        component.loading = true;

        fixture.detectChanges();

        mockStore.setState({
            auth: {
                loginError: "test error message",
                loginRunning: false
            }
        });

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(component.error).toBe('test error message');
            expect(component.loading).toBe(false);
            expect(component.spinnerState).toBe('hidden');

            let alertBoxMessage = fixture.debugElement.query(By.css('#alertBoxMessage'));
            expect(alertBoxMessage.nativeElement.textContent).toContain('test error message');
        });
    }));

    it ('should sign-up user', async(() => {
        let dispatchSpy = spyOn(mockStore, 'dispatch');

        switchLoginModel(fixture);
        setEmail(fixture, "test@test.com");
        setPassword(fixture, "1234");
        submitForm(fixture);

        const signUpSuccessful: AuthServiceResponse = {
           idToken:      "signupToken",
           email:        "signupEmail",
           refreshToken: "signupRefreshToken",
           expiresIn:    "1024",
           localId:      "signupUserId"
        };

        const signupRequest = mockHttpClient.expectOne(firebaseSignUpUrl);
        signupRequest.flush(signUpSuccessful);

        fixture.whenStable().then(() => {
            expect(signupRequest.request.method).toBe("POST");
            expect(signupRequest.request.body.email).toBe('test@test.com');
            expect(signupRequest.request.body.password).toBe('1234');
            expect(signupRequest.request.body.returnSecureToken).toBe(true);

            const expectedDate = new Date();
            expectedDate.setSeconds(mockDate.getSeconds() + 1024);

            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                new AuthActions.UserSignedIn({
                    email:      'signupEmail',
                    userId:     'signupUserId',
                    token:      'signupToken',
                    expiryDate: expectedDate
                })
            );

            expect(location.path()).toBe('/recipes');

            expect(component.error).toBe(null);
            expect(component.loading).toBe(false);
            expect(component.spinnerState).toBe('hidden');
        });
    }));

    it ('should display sign-up error', async(() => {
        switchLoginModel(fixture);
        submitForm(fixture);

        const httpErrorResponse = { status: 400, statusText: 'Bad Request' };
        const firebaseError = {
            error: {
                message: 'EMAIL_NOT_FOUND'
            }
        };

        const signupRequest = mockHttpClient.expectOne(firebaseSignUpUrl);
        signupRequest.flush(firebaseError, httpErrorResponse);

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(component.error).toBe('There is no user record corresponding to this identifier.');
            expect(component.loading).toBe(false);
            expect(component.spinnerState).toBe('hidden');

            let alertBoxMessage = fixture.debugElement.query(By.css('#alertBoxMessage'));
            expect(alertBoxMessage.nativeElement.textContent).toContain('There is no user record corresponding to this identifier.');
       });
    }));

    it ('should reset login when alert-box closed', async(() => {
        let dispatchSpy = spyOn(mockStore, 'dispatch');

        component.onAlertClosed();

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith(
            new AuthActions.LoginReset()
        );
    }));
})

function setEmail(fixture: ComponentFixture<AuthComponent>, email: String) {
    let emailInput = fixture.debugElement.nativeElement.querySelector("input[type=email]");
    emailInput.value = email;
    emailInput.dispatchEvent(new Event('input'));
}

function setPassword(fixture: ComponentFixture<AuthComponent>, password: String) {
    let passwordInput = fixture.debugElement.nativeElement.querySelector("input[type=password]");
    passwordInput.value = password;
    passwordInput.dispatchEvent(new Event('input'));
}

function switchLoginModel(fixture: ComponentFixture<AuthComponent>) {
    fixture.componentInstance.onSwitchMode();
    fixture.detectChanges();
}

function submitForm(fixture: ComponentFixture<AuthComponent>) {
    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
}
