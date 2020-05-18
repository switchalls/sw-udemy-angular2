import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

    @Output() featureSelected = new EventEmitter<string>();

    collapsed = true;

    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    }

}