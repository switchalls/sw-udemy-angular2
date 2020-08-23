import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';

const storageUrl = "https://ng-recipe-book-ba17b.firebaseio.com/recipes.json";

@Injectable()
export class RecipeService {

    recipeSelected = new Subject<Recipe>();

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    constructor(private http: HttpClient, private shoppingListService: ShoppingListService, private authService: AuthService) {
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(recipe: Recipe) {
        this.shoppingListService.addIngredients(recipe.ingredients);
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.getRecipes());
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.getRecipes());
    }

    loadStoredRecipes(): Observable<Recipe[]>  {
        // NB. AuthInterceptorService auto injects firebase token

        return this.http.get<Recipe[]>(storageUrl).pipe(
            map(storedRecipes => {
                // enure "ingedients" always set before passing onto subscriber
                return storedRecipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                });
            }),
            tap(storedRecipes => {
                console.log("Loading " + storedRecipes.length + " recipes");
                console.log(storedRecipes);

                this.recipes = storedRecipes;
                this.recipesChanged.next(this.getRecipes());
            })
        );
    }

    saveRecipes() {
        // use HTTP PUT to override existing data
        this.http.put(storageUrl, this.recipes).subscribe(
            httpResponse => {
                console.log("Stored " + this.recipes.length + " recipes");
                console.log(httpResponse);
            },
            httpErrorResponse => {
                alert(httpErrorResponse.message);
            }
       );
    }

}