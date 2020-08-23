import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesHomeComponent } from './recipes/recipes-home/recipes-home.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { RecipeResolver } from './recipes/recipe-resolver.service';
import { AuthGuard } from './auth/auth-guard';

const applicationRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'login', component: AuthComponent },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'recipes',
        component: RecipesComponent,
        canActivate: [
            AuthGuard
        ],
        children: [
            { path: '', component: RecipesHomeComponent, pathMatch: 'full' },
            { path: 'new', component: RecipeEditComponent, },
            { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver }},
            { path: ':id/edit', component: RecipeEditComponent, resolve: { recipe: RecipeResolver }},
        ]
    },
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
