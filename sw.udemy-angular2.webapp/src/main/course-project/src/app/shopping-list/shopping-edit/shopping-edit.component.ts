import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

    @Output() ingredientAdded = new EventEmitter<Ingredient>();

    @ViewChild("nameInput") nameInput: ElementRef;
    @ViewChild("amountInput") amountInput: ElementRef;
    @ViewChild("unitsInput") unitsInput: ElementRef;

    constructor() {
    }

    onAddIngredient() {
        this.ingredientAdded.emit(new Ingredient(
            this.nameInput.nativeElement.value,
            this.amountInput.nativeElement.value,
            this.unitsInput.nativeElement.value));
    }

}
