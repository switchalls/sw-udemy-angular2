import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    ingredientForm: FormGroup;

    ingredientIndex: number = -1;

    ingredientUnits: string[] = ["g", "ml", "units"];

    private startIngredientEditSubscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) {
    }

    ngOnInit() {
        this.ingredientForm = new FormGroup({
            'name': new FormControl(null, Validators.required),
            'amount': new FormControl(1, [
                Validators.required,
                Validators.pattern(/^[0-9]+[0-9]*$/)
             ]),
            'units': new FormControl(this.ingredientUnits[0])
        });

        this.startIngredientEditSubscription = this.shoppingListService.startIngredientEdit.subscribe(
            (index: number) => {
                this.ingredientIndex = index;

                const ingredientToEdit = this.shoppingListService.getIngredient(index);
                this.ingredientForm.setValue({
                    "name": ingredientToEdit.name,
                    "amount": ingredientToEdit.amount,
                    "units": ingredientToEdit.units
                });
            }
        );
    }

    ngOnDestroy() {
        this.startIngredientEditSubscription.unsubscribe();
    }

    onAddIngredient() {
        const newIngedient = new Ingredient(
                this.ingredientForm.value.name,
                this.ingredientForm.value.amount,
                this.ingredientForm.value.units);

        if (this.isEditing()) {
            this.shoppingListService.updateIngredient(this.ingredientIndex, newIngedient);
        } else {
            this.shoppingListService.addIngredient(newIngedient);
        }

        this.onClearForm();
    }

    onDeleteIngredient() {
        this.shoppingListService.removeIngredient(this.ingredientIndex);
        this.onClearForm();
    }

    onClearForm() {
        this.ingredientForm.reset();
        this.ingredientIndex = -1;
    }

    isEditing() {
        return this.ingredientIndex > -1;
    }

}
