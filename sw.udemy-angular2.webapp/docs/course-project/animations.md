# Animations

## Enable

Import `BrowserAnimationsModule` in `app.module.ts`, eg.

```
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule
  ]
})
export class AppModule { }
```

## List item animations

### Enable

Declare `trigger` in component, eg. `shopping-list.component.ts`

```
@Component({
    animations: [
        trigger('shoppingListAnimations', [
            state('itemInList', style({
                opacity:   1,
                transform: 'translateX(0)'
            })),
        ])
    ]
})
```

Enable `trigger` in view using `[@]`, eg. `shopping-list.component.html`

```
<ul class="list-group">
    <a
        *ngFor = "let ingredient of (shoppingList | async).ingredients let i = index"
        ...
        [@shoppingListAnimations]>
```
 
### Fade in when adding items

`style()` before `animate` = initial state before animation, eg.

```
@Component({
    animations: [
        trigger('shoppingListAnimations', [
            ...
            transition('void => *', [
                style({
                    opacity:   0,
                    transform: 'translateX(-100px)'
                }),
                animate(300)
            ])
        ])
    ]
})
```

*NB.* The `void` state = `not in DOM`

### Fade out when deleting items

`style()` after `animate` = final state after animation, eg.

```
@Component({
    selector: 'app-shopping-list',
    animations: [
        trigger('shoppingListAnimations', [
            ...
            transition('* => void', [
                animate(300),
                style({
                    opacity:   0,
                    transform: 'translateX(100px)'
                })
            ])
        ])
    ]
})
```

## Stateful animations

Assign variable when declaring animations in view, eg. `auth.component.html`

```
<div class="spinner-box" [@spinnerAnimations]="spinnerState">
```

Trigger animations by assigning new vales to variable, eg. `auth.component.ts`

```
onSubmit() {
    this.spinnerState = 'visible';
    this.loading = true;
```

