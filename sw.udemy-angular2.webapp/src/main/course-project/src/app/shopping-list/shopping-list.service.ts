import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(newIngredients: Ingredient[]) {
        this.ingredients.push(...newIngredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}