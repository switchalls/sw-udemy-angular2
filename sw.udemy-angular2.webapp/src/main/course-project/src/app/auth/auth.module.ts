import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';

const authRoutes: Routes = [
    { path: 'login', component: AuthComponent }
];

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        ReactiveFormsModule,
        RouterModule.forChild(authRoutes),
        SharedModule
    ],
    exports: [
        AuthComponent
    ]
})
export class AuthModule {}