import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipesHomeComponent } from './recipes/recipes-home/recipes-home.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { RecipeResolver } from './recipes/recipe-resolver.service';

const applicationRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipesHomeComponent, pathMatch: 'full' },
        { path: ':id', component: RecipeDetailComponent, resolve: {
            recipe: RecipeResolver
        }}
    ] },
    { path: 'shopping-list', component: ShoppingListComponent },
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
