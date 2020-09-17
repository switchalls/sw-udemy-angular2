# Testing

See [angular.io](https://angular.io/guide/testing)

For integration testing:
* [protractor](https://coryrylan.com/blog/introduction-to-e2e-testing-with-the-angular-cli-and-protractor)

## Running

```
$ ng test
10% building 2/2 modules 0 active16 09 2020 13:53:33.504:WARN [karma]: No captured browser, open http://localhost:9876/
16 09 2020 13:53:33.509:INFO [karma-server]: Karma v4.3.0 server started at http://0.0.0.0:9876/
16 09 2020 13:53:33.510:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
16 09 2020 13:53:33.522:INFO [launcher]: Starting browser Chrome
16 09 2020 13:53:39.215:WARN [karma]: No captured browser, open http://localhost:9876/
16 09 2020 13:53:39.446:INFO [Chrome 85.0.4183 (Mac OS X 10.15.6)]: Connected on socket s1tk5o7LThOcsUNaAAAA with id 6503026
TOTAL: 6 SUCCESS
TOTAL: 6 SUCCESS
```

## Isolated Tests

Tests with no external dependencies, eg. `shorten.pipe.spec.ts`

Create `testSubject` inside test using `new`, eg.

```
describe('ShortenPipe', () => {
    it('should shorten string', () => {
        let testSubject = new ShortenPipe();
        expect(testSubject.transform('Hello', 1)).toBe('H...');
    });
}
```

## Non-isolated Tests

Components with dependencies, eg. `auth.component.spec.ts`

Use `TestBed` to setup declarations and imports, eg.

```
describe('AuthComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AuthComponent
            ],
            imports: [
                BrowserAnimationsModule,
                ReactiveFormsModule
            ],
        });
    });
```

### Async wrapper

When components run async tasks, eg. `Promise`

Wrap the test with `async()` to enable, eg.

```
it ('should sign-up user', async( () => {
    ...

    fixture.whenStable().then(() => {
        ...
    });
}));
```

Use `fixture.whenStable()` to make tests wait for all async operations to complete.

### Verifying date values

Use `jasmine.clock().mockDate()` to mock the system clock, eg.

```
describe('AuthComponent', () => {
    let mockDate: Date;

    beforeEach(() => {
        mockDate = new Date('2020-01-01');
        jasmine.clock().mockDate(mockDate);
    });

    ...

    const expectedDate = new Date();
    expectedDate.setSeconds(mockDate.getSeconds() + 1024);

    expect(dispatchSpy).toHaveBeenCalledWith(
        new AuthActions.UserSignedIn({
            email:      'signupEmail',
            userId:     'signupUserId',
            token:      'signupToken',
            expiryDate: expectedDate
        })
    );
```

### Mock store

Use `provideMockStore` to setup initial state, eg.

```
describe('AuthComponent', () => {
    let mockStore: MockStore;

    let initialState = {
        auth: {
            loginError: null,
            loginRunning: false
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState: initialState
                })
            ]
        });

        mockStore = TestBed.inject(MockStore);
    });
```

Use `spyOn` to verify `dispatch()` calls, eg.

```
let dispatchSpy = spyOn(mockStore, 'dispatch');

...

fixture.whenStable().then(() => {
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
});
```

Use `setState()` to simulate state changes, eg.

```
mockStore.setState({
    auth: {
        loginError: "test error message",
        loginRunning: false
    }
});

fixture.whenStable().then(() => {
    fixture.detectChanges();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('test error message');
});
```

### Test HttpClient

Import `HttpClientTestingModule` to enable, eg.

```
const firebaseSignUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=...`;

describe('AuthComponent', () => {
    let mockHttpClient: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
        });

        mockHttpClient = TestBed.inject(HttpTestingController);
    });
```

Use `mockHttpClient.expectOne(<url>)` to setup request mock(ing), eg.

```
    it ('should simulate response', async(() => {
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
        });
    }));
```

Use `flush()` to mock responses.

*NB.* Request url(s) must match exactly

### Test router

Install routes using `RouterTestingModule`, eg.

```
describe('AuthComponent', () => {
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'recipes', component: RecipesComponent },
                ]),
            ],
        });

        location = TestBed.get(Location);
    });
```

Use `location` to verify page changes, eg.

```
fixture.whenStable().then(() => {
    expect(location.path()).toBe('/recipes');
});
```

