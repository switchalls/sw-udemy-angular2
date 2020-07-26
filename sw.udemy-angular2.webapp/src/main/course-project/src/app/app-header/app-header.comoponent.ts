import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

    @Output() featureSelected = new EventEmitter<string>();

    collapsed = true;

    constructor(private recipeService: RecipeService) {
    }

    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    }

    onAddMockRecipes() {
        console.log('Adding mock recipes');

        this.recipeService.addRecipe(new Recipe(
            "Vanilla Cake",
            "A classic vanilla cake recipe made completely from scratch!",
            "https://i2.wp.com/www.sugarspunrun.com/wp-content/uploads/2018/01/Vanilla-Cake-Recipe-1-of-1-15.jpg",
            [
                new Ingredient("Flour", 250, "g"),
                new Ingredient("Milk", 90, "ml"),
                new Ingredient("Apple", 5, "units")
            ]
        ));

        this.recipeService.addRecipe(new Recipe(
            "Beckys Butter Cake",
            "Butter cake recipe reminiscent of the 1-2-3-4 cake that Grandma may have baked",
            "https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/16730-beckys-butter-cake-600x600.jpg?ext=.jpg",
            [
                new Ingredient("Flour", 500, "g"),
                new Ingredient("Sugar", 100, "g"),
                new Ingredient("Milk", 200, "ml")
            ]
        ));
    }

    onLoadRecipes() {
        this.recipeService.loadStoredRecipes().subscribe(
            storedRecipes => {
                // do nothing
            },
            httpErrorResponse => {
                alert(httpErrorResponse.message);
            }
        );
    }

    onSaveRecipes() {
        this.recipeService.saveRecipes();
    }

}