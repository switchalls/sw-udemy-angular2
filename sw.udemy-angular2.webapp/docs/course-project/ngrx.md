# NgRX

## Redux vs NgRx

Using [services](./services.md) to store state and [RxJS](./observables.md) for communication:

* State can be updated anywhere
* State can be mutable
* Handling of side effects (eg. Http calls) may be unclear

![redux](./images/redux.png)

`NgRx` is Angular's implementation of `Redux`

![NgRx](./images/ngrx.png)

It provides injectable `store` service and integrates with [NxRJ](./observables.md).

## Installation

```
£ npm install --save @ngrx/store
npm WARN @ngrx/store@10.0.0 requires a peer of @angular/core@^10.0.0 but none is installed. You must install peer dependencies yourself.

+ @ngrx/store@10.0.0
added 2 packages from 2 contributors and audited 1498 packages in 5.938s

37 packages are looking for funding
  run `npm fund` for details

found 275 vulnerabilities (268 low, 7 high)
  run `npm audit fix` to fix them, or `npm audit` for details
```

## Store Events

eg. `shopping-list.actions.ts`

```
export type AllActions = AddIngredient | ...;

export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) {
    }
}
```

`AllActions` describes all possible `shopping-list` actions ; used in `reducer` declarations.

Each action type is declared as a `class`, eg. `UpdateIngredient`

## Store Types

Create types for describing `NgRx` storage types, eg. `shopping-list.reducer.ts`

```
export interface State {
    ingredients: Ingredient[],
    editedIgredient: Ingredient,
    editedIgredientIndex: number
}

export interface AppState {
    shoppingList: State
}
```

## Importing Types

```
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducer';
```

## Reducers

Functions that map events the `NgRx` storage, eg. `shopping-list.reducer.ts`

Reducers are declared in `app.module.ts`, eg.

```
@NgModule({
  imports: [
    StoreModule.forRoot({
        shoppingList: shoppingListReducer
    })
  ]
})
export class AppModule { }
```

Reducers must always return immutable state, eg.

```
export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.AllActions): State {
   switch (action.type) {
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIgredientIndex];

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIgredientIndex] = {
                ...ingredient,
                ...action.payload
            };

            return { ...state, ingredients: updatedIngredients };
    }
}
```

Use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (`...`) to clone data.

Reducers must support `initial state` (for when application starts) and handle unrecognised events via `default`, eg.

```
const initialState: State = {
    ingredients: [],
    editedIgredient: null,
    editedIgredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, ... {
   switch (action.type) {
        default:
            return state;
    }
}
```

*NB.* All reducers receive all events (including `NgRx` events).

Strong type reducer to avoid field name mistmatches in updated state, eg.

```
export function shoppingListReducer(...): State {
```

*Warning -* Javascript will add wrongly named properties as `new` fields. Typing will allow the editor guide you!

## Dispatching Events

```
constructor(private store: Store<fromShoppingList.AppState>) {
}

onAddIngredient() {
    const newIngedient = ...

    if (this.isEditing()) {
        this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngedient));
    } else {
        this.store.dispatch(new ShoppingListActions.AddIngredient(newIngedient));
    }

    this.onClearForm();
}
```

## Using Store Data

`store#select()` returns [Observable](./observables.md).

Use `aync` operator inside HTML, eg.

```
<ul class="list-group">
    <a *ngFor = "let ingredient of (shoppingList | async).ingredients let i = index"
```

## Application reducer

Declare the application wide `AppState`, eg.

```
export interface AppState {
    auth: fromAuth.State,
    shoppingList: fromShoppingList.State
}
```

Simplify `app.module.ts` by creating a `ActionReducerMap`, eg.

```
export const appReducerMap: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    shoppingList: fromShoppingList.shoppingListReducer
};
```


