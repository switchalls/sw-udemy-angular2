# Authentication

Uses [firebase](./firebase.md) authentication

## Loading spinners

Spinner downloaded from [loading.io](https://loading.io/spinner)

See `shared/loading-spinner`

## Displaying error messages

Use `pipe` to create service specific error messages, eg.

```
return this.http.post<FirebaseSignUpResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.firebaseKey, {
    email: email,
    password: password,
    returnSecureToken: true
}).pipe(catchError(errorResponse => {
    let errorMessage = "Unknown error";

    switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = "The email address is already in use by another account.";
            break;

        case 'OPERATION_NOT_ALLOWED':
            errorMessage = "Password sign-in is disabled for this project.";
            break;

        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
            break;
    }

    return throwError(errorMessage);
}));
```

## Sharing observable code

Create a local `Observable` variable, eg.

```
let authObersvable: Observable<AuthServiceResponse>;
if (this.loginMode) {
    authObersvable = this.authService.signInWithPassword(this.loginForm.value.email, this.loginForm.value.password);
} else {
    authObersvable = this.authService.signUp(this.loginForm.value.email, this.loginForm.value.password);
}

authObersvable.subscribe(
    response => {
        console.log(response);
        this.error = null;
        this.loading = false;
    },
    errorMessage => {
        this.error = errorMessage;
        this.loading = false;
    }
);
```

## Auto inject tokens

Use HTTP interceptors, eg. `AuthInterceptorService`

## Support page refresh

`localStorage` can be used to persist JSON data on the local host, eg.

```
autoLogin() {
    const storedUser: StoredUser = JSON.parse(localStorage.getItem("userData"));

    if (storedUser) {
        const restoredUser = new User(
            storedUser.email,
            storedUser.id,
            storedUser._token,
            new Date(storedUser._expiryDate));

        if (!restoredUser.isExpired()) {
            this.user.next(restoredUser);
        }
    }
}
```

## Auto redirect user to login page

Use a `CanActivate` guard that returns a `UrlTree`, eg.

```
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) : Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                if (user) {
                    return true;
                }

                // auto route user to "login" page when not authenticated'

                return this.router.createUrlTree(["/login"]);
            })
        );
    }
```

NB. Use `take` to stop the guard's subscription being kept alive after use
