import { Action } from '@ngrx/store';

export type AllActions =
      UserSignedIn
    | UserSignedOut;

export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT';

export class UserSignedIn implements Action {
    readonly type = USER_SIGNED_IN;

    constructor (public payload: {
        email: string,
        userId: string,
        token: string,
        expiryDate: Date
    }) {
    }
}


export class UserSignedOut implements Action {
    readonly type = USER_SIGNED_OUT;
}