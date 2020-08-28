import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from "../recipe.model";
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

    recipes: Recipe[];

    recipesChangedSubscription: Subscription;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.recipes = this.recipeService.getRecipes();
        
        this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(
            (newRecipes: Recipe[]) => {
                this.recipes = newRecipes;
            }
        );
    }

    ngOnDestroy() {
        this.recipesChangedSubscription.unsubscribe();
    }

    onNewRecipe() {
        this.router.navigate(["new"], { relativeTo: this.route} );
    }

    onRecipeSelected(recipe: Recipe, recipeId: number) {
        console.log("recipeSelected: " + recipeId + "/" + recipe.name)
        this.recipeService.recipeSelected.next(recipe);
    }

}
