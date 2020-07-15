import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    @Input() recipe: Recipe;
    @Input() recipeId: number;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.recipeId = params['id'];
            }
        );

        this.route.data.subscribe(
            (data: Data) => {
                this.recipe = data['recipe'];
            }
        );
    }

    onAddToShoppingList(recipe: Recipe) {
        this.recipeService.addIngredientsToShoppingList(recipe);
    }

    onDeleteRecipe() {
        this.recipeService.removeRecipe(this.recipeId);
        this.router.navigate(['/recipes']);
    }
}
