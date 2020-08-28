import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';

const applicationRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'login', component: AuthComponent }
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
