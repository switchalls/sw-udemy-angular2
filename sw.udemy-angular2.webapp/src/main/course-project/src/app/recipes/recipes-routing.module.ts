import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard';

import { RecipesComponent } from './recipes.component';
import { RecipesHomeComponent } from './recipes-home/recipes-home.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipe-resolver.service';

const recipesRoutes: Routes = [
    { path: '',
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
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [
        RouterModule,
    ]
})
export class RecipesRoutingModule {}