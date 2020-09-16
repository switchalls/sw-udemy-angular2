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

Use `beforeEach` to setup declarations and imports, eg.

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

### Aync wrapper

When component runs async tasks (eg. `Promise`), eg.

*TBD* - Example

### Mock store

Setup initial state using `provideMockStore`, eg.

```
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
            providers: [
                provideMockStore({
                    initialState: initialState
                })
            ]
        });

        store = TestBed.inject(MockStore);
    });
```

### Test HttpClient

Import using `HttpClientTestingModule`, eg.

```
describe('AuthComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
        });
    });
```

*TBD* - Usage?

### Test router

Install routes using `RouterTestingModule`, eg.

```
describe('AuthComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([])
            ],
        });
    });
```

*TBD* - Usage?

