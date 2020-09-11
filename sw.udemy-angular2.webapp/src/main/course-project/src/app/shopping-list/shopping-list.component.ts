import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Component({
    selector:    'app-shopping-list',
    templateUrl: 'shopping-list.component.html',
    styleUrls: [
        'shopping-list.component.css'
    ],
    animations: [
        trigger('shoppingListAnimations', [
            state('itemInList', style({
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
