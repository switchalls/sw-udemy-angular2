import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[],
    editedIgredient: Ingredient,
    editedIgredientIndex: number
}

export interface AppState {
    shoppingList: State
}

const initialState: State = {
    ingredients: [],
    editedIgredient: null,
    editedIgredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.AllActions): State {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients, action.payload] };

        case ShoppingListActions.ADD_INGREDIENTS:
            return { ...state, ingredients: [...state.ingredients, ...action.payload] };

        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIgredientIndex];

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIgredientIndex] = {
                ...ingredient,
                ...action.payload
            };

            return { ...state, ingredients: updatedIngredients };

        case ShoppingListActions.DELETE_INGREDIENT:
            const deletedIngredients = state.ingredients.filter( (item, index) => {
                return index !== state.editedIgredientIndex;
            });

            return { ...state, ingredients: deletedIngredients };

        case ShoppingListActions.START_EDITING:
            return { 
                ...state,
                editedIgredient: { ...state.ingredients[action.payload] },
                editedIgredientIndex: action.payload
            };


       case ShoppingListActions.STOP_EDITING:
            return { 
                ...state,
                editedIgredient: null,
                editedIgredientIndex: -1
            };

        default:
            return state;
    }
}