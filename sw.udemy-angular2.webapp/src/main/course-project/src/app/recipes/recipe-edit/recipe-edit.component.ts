import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: 'recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  animations: [
        trigger('recipeAnimations', [
            state('ingredientInList', style({
                opacity:   1,
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                style({
                    opacity:   0,
                    transform: 'translateX(-100px)'
                }),
                animate(300)
            ]),
            transition('* => void', [
                animate(300),
                style({
                    opacity:   0,
                    transform: 'translateX(100px)'
                })
            ])
        ])
    ]

})
export class RecipeEditComponent implements OnInit {

    @Input() recipe: Recipe;
    @Input() recipeId: number;

    ingredientUnits: string[] = ["g", "ml", "units"];

    recipeForm: FormGroup;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.recipeForm = new FormGroup({
            "name": new FormControl(null, Validators.required),
            "imagePath": new FormControl(null, Validators.required),
            "description": new FormControl(null),
            "ingredients": new FormArray([])
        });

        this.route.params.subscribe(
            (params: Params) => {
                this.recipeId = params['id'];
            }
        );

        this.route.data.subscribe(
            (data: Data) => {
                this.recipe = data['recipe'];

                if (this.recipe != null) {
                    this.recipeForm.patchValue({
                        "name": this.recipe.name,
                        "description": this.recipe.description,
                        "imagePath": this.recipe.imagePath
                    });

                    this.setIngredientControls(this.recipe)
                }
            }
        );
    }

    onSaveRecipe() {
/*
        const newRecipe = new Recipe(
            this.recipeForm.value.name,
            this.recipeForm.value.description,
            this.recipeForm.value.imagePath,
            this.recipeForm.value.ingredients
        );
*/
        if (this.isEditing()) {
            this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }

        this.onCancelForm();
    }

    onCancelForm() {
        this.router.navigate([".."], {relativeTo: this.route});
    }

    isEditing() {
        return this.recipeId != undefined;
    }

    getIngredientControls() {
        return (this.recipeForm.get('ingredients') as FormArray).controls;
    }

    setIngredientControls(recipe: Recipe) {
        const newArray = new FormArray([]);

        if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
                newArray.push(new FormGroup({
                    "name": new FormControl(ingredient.name, Validators.required),
                    "amount": this.createAmountControl(ingredient.amount),
                    "units": new FormControl(ingredient.units)
                }));
            }
        }

        this.recipeForm.setControl('ingredients', newArray);
    }

    onAddIngredient() {
        (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
            "name": new FormControl(null, Validators.required),
            "amount": this.createAmountControl(1),
            "units": new FormControl("g")
        }));
    }

    onRemoveIngredient(index: number) {
        (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
    }

    createAmountControl(value: number) {
        return new FormControl(value, [
            Validators.required,
            Validators.pattern(/^[0-9]+[0-9]*$/)
         ]);
    }

}
