import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

    shoppingList: Observable<fromShoppingList.State>;

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.shoppingList = this.store.select('shoppingList');
    }

    onEditIngredient(index: number) {
        this.store.dispatch(new ShoppingListActions.StartEditing(index));
    }

}
