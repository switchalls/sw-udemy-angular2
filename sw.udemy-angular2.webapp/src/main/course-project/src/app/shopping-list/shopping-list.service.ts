import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingrediants: Ingredient[] = [];

    getIngredients() {
        return this.ingrediants.slice();
    }

    addIngredient(newIngredient: Ingredient) {
        this.ingrediants.push(newIngredient);
        this.ingredientsChanged.emit(this.ingrediants.slice());
    }

    addIngredients(newIngredients: Ingredient[]) {
        this.ingrediants.push(...newIngredients);
        this.ingredientsChanged.emit(this.ingrediants.slice());
    }

}