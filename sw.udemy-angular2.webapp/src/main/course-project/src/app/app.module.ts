import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AlertComponent } from './alert/alert.component';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.comoponent';
import { AppRoutingModule } from './app-routing.module';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner';
import { AuthComponent } from './auth/auth.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesHomeComponent } from './recipes/recipes-home/recipes-home.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthService } from './auth/auth.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeResolver } from './recipes/recipe-resolver.service';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    AppHeaderComponent,
    AuthComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    RecipesComponent,
    RecipesHomeComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    RecipeResolver,
    RecipeService,
    ShoppingListService,
    {
        provide:  HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi:    true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
