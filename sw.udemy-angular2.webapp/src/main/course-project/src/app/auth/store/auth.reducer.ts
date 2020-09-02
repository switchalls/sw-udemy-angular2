import { User } from '../user.model';

import * as AuthActions from './auth.actions';

export interface State {
    user: User
}

const initialState: State = {
    user: null
}

export function authReducer(state: State = initialState, action: AuthActions.AllActions): State {
    switch (action.type) {
        case AuthActions.USER_SIGNED_IN:
            const newUser = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expiryDate
            );

            return { ...state, user: newUser };

        case AuthActions.USER_SIGNED_OUT:
            return { ...state, user: null };

        default:
            return state;
    }
}
