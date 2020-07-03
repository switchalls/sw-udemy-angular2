import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {

    @Input() currentRecipe: Recipe;

    private recipeSelectedSubscription: Subscription;

    constructor(private recipeService: RecipeService) {
    }

    ngOnInit() {
        this.recipeSelectedSubscription = this.recipeService.recipeSelected.subscribe(
            (recipe: Recipe) => {
                this.currentRecipe = recipe;
            }
        );
    }

    ngOnDestroy() {
        this.recipeSelectedSubscription.unsubscribe();
    }

}
