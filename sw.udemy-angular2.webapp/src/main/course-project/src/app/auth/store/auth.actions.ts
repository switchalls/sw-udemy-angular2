import { Action } from '@ngrx/store';

export type AllActions =
      UserSignedIn
    | UserSignedOut
    | LoginRequested
    | LoginFailed
    | LoginReset;

export const USER_SIGNED_IN = '[Auth] UserSignedIn';
export const USER_SIGNED_OUT = '[Auth] UserSignedOut';
export const LOGIN_REQUESTED = '[Auth] LoginRequested';
export const LOGIN_FAILED = '[Auth] LoginFailed';
export const LOGIN_RESET = '[Auth] LoginReset';

export class UserSignedIn implements Action {
    readonly type = USER_SIGNED_IN;

    constructor (public payload: {
        email:      string;
        userId:     string;
        token:      string;
        expiryDate: Date
    }) {}
}


export class UserSignedOut implements Action {
    readonly type = USER_SIGNED_OUT;
}

export class LoginRequested implements Action {
    readonly type = LOGIN_REQUESTED;

    constructor (public payload: {
        email:    string;
        password: string;
    }) {}
}

export class LoginFailed implements Action {
    readonly type = LOGIN_FAILED;

    constructor (public payload: {
        email:        string;
        errorMessage: string;
    }) {}
}

export class LoginReset implements Action {
    readonly type = LOGIN_RESET;
}
