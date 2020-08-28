import { NgModule } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';

@NgModule({
    declarations: [
        DropdownDirective,
        PlaceholderDirective,
        AlertComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [
        AlertComponent
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        PlaceholderDirective,
        AlertComponent,
        LoadingSpinnerComponent
    ]
})
export class SharedModule {}