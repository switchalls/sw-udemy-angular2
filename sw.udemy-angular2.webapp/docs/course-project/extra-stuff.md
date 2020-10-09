# Extra Stuff (learnt along the way)

Stuff learnt after the course.

## Inject template content without wrapper tag

Wrapper tags can interfere with jQuery plugin CSS.

For example, [inspinia](https://wrapbootstrap.com/theme/inspinia-responsive-admin-theme-WB0R5L90S)'s `.nav-second-level li a` will ignore

```
<ul class="nav nav-second-level">
    <li>
        <app-navigation-link>
            <a ...></a>
```

See [stackoverflow](https://stackoverflow.com/questions/38716105/angular2-render-a-component-without-its-wrapping-tag) for discussion

Declare component as normal, eg. `navigation-link.component.ts`

```
<a [routerLink]="url" [class.disabled]="disabled">{{ text }} <span *ngIf="disabled" [innerHTML]="emojiLock"></span></a>
```

Use attribute selectors, eg. `navigation-bar.component.html`

```
<li navigation-link [text]="'Assets'" [url]="'/asset/list'"></li>
```

*NB.* `text` and `url` are `@Input`(s) declared in `navigation-bar.component.ts`

## Install JQuery plugins

See [fontawesome.com](https://fontawesome.com/)

See [FortAwesome](https://github.com/FortAwesome/angular-fontawesome)

```
$ npm install -save font-awesome
```

@import `~font-awesome/css/font-awesome.css` in `styles.css`

Install `FortAwesome`

```
$ ng add @fortawesome/angular-fontawesome@0.7.0
? Choose Font Awesome icon packages you would like to use: Free Solid Icons
```

## Display Emoji(s)

Declare Emoji's code in model, eg.

```
export class NavigationBarComponent {

    emojiLock = "&#128274;"

}
```

Use property binding to inject Emoji into HTML, eg.

```
<span [innerHTML]="emojiLock"></span>
```
