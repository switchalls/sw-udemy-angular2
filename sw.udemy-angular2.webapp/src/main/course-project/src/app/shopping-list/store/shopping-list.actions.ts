import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export type AllActions =
      AddIngredient
    | AddIngredients
    | UpdateIngredient
    | DeleteIngredient
    | StartEditing
    | StopEditing;

export const ADD_INGREDIENT = '[Shopping List] AddIngredient';
export const ADD_INGREDIENTS = '[Shopping List] AddIngredients';
export const UPDATE_INGREDIENT = '[Shopping List] UpdateIngredient';
export const DELETE_INGREDIENT = '[Shopping List] DeleteIngredient';
export const START_EDITING = '[Shopping List] StartEditing';
export const STOP_EDITING = '[Shopping List] StopEditing';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {
    }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {
    }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) {
    }
}


export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StartEditing implements Action {
    readonly type = START_EDITING;

    constructor(public payload: number) {
    }
}

export class StopEditing implements Action {
    readonly type = STOP_EDITING;
}