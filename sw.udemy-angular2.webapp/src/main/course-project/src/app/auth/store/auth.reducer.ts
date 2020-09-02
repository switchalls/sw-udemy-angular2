import { User } from '../user.model';

import * as AuthActions from './auth.actions';

export interface State {
    user: User;
    loginError: string;
    loginRunning: boolean;
}

const initialState: State = {
    user: null,
    loginError: null,
    loginRunning: false
}

export function authReducer(state: State = initialState, action: AuthActions.AllActions): State {
    switch (action.type) {
        case AuthActions.LOGIN_REQUESTED:
            return {
                ...state,
                user: null,
                loginError: null,
                loginRunning: true
            };

        case AuthActions.LOGIN_FAILED:
            return {
                ...state,
                loginError: action.payload.errorMessage,
                loginRunning: false
            };

       case AuthActions.LOGIN_RESET:
            return {
                ...state,
                loginError: null,
                loginRunning: false
            };

        case AuthActions.USER_SIGNED_IN:
            const newUser = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expiryDate
            );

            return {
                ...state,
                user: newUser,
                loginError: null,
                loginRunning: false
            };

        case AuthActions.USER_SIGNED_OUT:
            return { ...state, user: null };

        default:
            return state;
    }
}
