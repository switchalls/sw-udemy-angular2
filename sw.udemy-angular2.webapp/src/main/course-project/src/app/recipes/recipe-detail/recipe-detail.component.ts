import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    @Input() recipe: Recipe;

    constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            (data: Data) => {
                this.recipe = data['recipe'];
            }
        );
    }

    onAddToShoppingList(recipe: Recipe) {
        this.recipeService.addIngredientsToShoppingList(recipe);
    }

}
