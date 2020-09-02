import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    ingredientForm: FormGroup;

    ingredientIndex: number = -1;

    ingredientUnits: string[] = ["g", "ml", "units"];

    private shoppingListSubscription: Subscription;

    constructor(private store: Store<fromShoppingList.AppState>) {
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

        this.shoppingListSubscription = this.store
            .select('shoppingList')
            .subscribe( stateData => {
                if (stateData.editedIgredientIndex < 0) {
                    this.ingredientIndex = -1;
                } else {
                    this.ingredientIndex = stateData.editedIgredientIndex;
                    this.ingredientForm.setValue({
                        "name": stateData.editedIgredient.name,
                        "amount": stateData.editedIgredient.amount,
                        "units": stateData.editedIgredient.units
                    });
                }
            });
    }

    ngOnDestroy() {
        this.store.dispatch(new ShoppingListActions.StopEditing());
        this.shoppingListSubscription.unsubscribe();
    }

    onAddIngredient() {
        const newIngedient = new Ingredient(
                this.ingredientForm.value.name,
                this.ingredientForm.value.amount,
                this.ingredientForm.value.units);

        if (this.isEditing()) {
            this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngedient));
        } else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(newIngedient));
        }

        this.onClearForm();
    }

    onDeleteIngredient() {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        this.onClearForm();
    }

    onClearForm() {
        this.store.dispatch(new ShoppingListActions.StopEditing());
        this.ingredientForm.reset();
        this.ingredientIndex = -1;
    }

    isEditing() {
        return this.ingredientIndex > -1;
    }

}
