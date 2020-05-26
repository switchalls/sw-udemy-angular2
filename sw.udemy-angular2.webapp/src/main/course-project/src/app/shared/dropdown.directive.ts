import { Directive, HostBinding, HostListener } from '@angular/core';

// Required to enable bootstrap dropdown menu(s) when NOT using bootstrap javascript

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    // toggle presence of bootstrap class 'open' when menu clicked

    @HostBinding('class.open') isOpen = false;
    
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

}