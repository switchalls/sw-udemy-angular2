import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: 'recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    @Input() recipe: Recipe;
    @Input() recipeId: number;

    editMode: boolean;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.recipeId = params['id'];
            }
        );

        this.route.data.subscribe(
            (data: Data) => {
                this.recipe = data['recipe'];
                this.editMode = this.recipe != null;
            }
        );
    }

}
