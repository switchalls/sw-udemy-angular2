import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            "Vanilla Cake",
            "A classic vanilla cake recipe made completely from scratch!",
            "https://i2.wp.com/www.sugarspunrun.com/wp-content/uploads/2018/01/Vanilla-Cake-Recipe-1-of-1-15.jpg",
            [
                new Ingredient("Flour", 250, "g"),
                new Ingredient("Milk", 90, "ml"),
                new Ingredient("Apple", 5, "units")
            ]),
        new Recipe(
            "Beckys Butter Cake",
            "Butter cake recipe reminiscent of the 1-2-3-4 cake that Grandma may have baked",
            "https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/16730-beckys-butter-cake-600x600.jpg?ext=.jpg",
            [
                new Ingredient("Flour", 500, "g"),
                new Ingredient("Sugar", 100, "g"),
                new Ingredient("Milk", 200, "ml")
            ]),
    ];

    constructor(private shoppingListService: ShoppingListService) {
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(recipe: Recipe) {
        this.shoppingListService.addIngredients(recipe.ingredients);
    }

}