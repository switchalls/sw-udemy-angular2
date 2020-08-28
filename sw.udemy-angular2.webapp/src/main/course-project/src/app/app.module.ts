import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.comoponent';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

import { AuthInterceptorService } from './auth/auth-interceptor.service';

const applicationRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => { return importRecipesModule(); } },
];

async function importRecipesModule() {
    const m = await import('./recipes/recipes.module');
    return m.RecipesModule;
}

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(applicationRoutes),
    AuthModule,
    SharedModule,
    ShoppingListModule
  ],
  providers: [
    {
        provide:  HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi:    true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
