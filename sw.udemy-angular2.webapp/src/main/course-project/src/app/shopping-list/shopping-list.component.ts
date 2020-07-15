import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    @Input() ingredients: Ingredient[];

    private ingredientsChangedSubscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) {
    }

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();

        this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(
            (newIngredients: Ingredient[]) => {
                this.ingredients = newIngredients;
            }
        );
    }

    ngOnDestroy() {
        this.ingredientsChangedSubscription.unsubscribe();
    }

    onEditIngredient(index: number) {
        this.shoppingListService.startIngredientEdit.next(index);
    }

}
