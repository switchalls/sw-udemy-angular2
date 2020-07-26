import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe> {

    constructor(private recipeService: RecipeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<Recipe> | Observable<Recipe> | Recipe {
        let recipeId = +route.params['id'];

        // Support user refreshing pages when viewing or editing recipes
        // by auto reloading recipes from storage.
        //
        // NB. App reset on page refreshes (or URL bar changes), causing data
        // in RecipeService to be wiped.
        //
        // But, what is user did not store before refresh?
        // eg. invalid recipeId or changed recipe? 

        let recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            console.log("Recipe database empty");
            console.log("Priming recipes");

            return this.recipeService
                .loadStoredRecipes()
                .pipe(map( storedRecipes => {
                    console.log('Auto loading recipe: ' + recipeId);
                    return storedRecipes[recipeId];
                }));
        }

        return recipes[recipeId];
    }

} 
