import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const applicationRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {path: 'recipes', component: RecipesComponent },
    {path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(applicationRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
