# Modules

## Declaring modules

Use `@ngModule`, eg.

```
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
```

You must import everything the module requires to operate, eg. `FormModule` when components use forms.

Modules should use `exports` when they want to make components available to consumers.

`app.module.ts` cannot `imports` components declared in modules.

## Lazy loading modules

```
const applicationRoutes: Routes = [
    { path: 'recipes', loadChildren: () => { return importRecipesModule(); } },
];

async function importRecipesModule() {
    const m = await import('./recipes/recipes.module');
    return m.RecipesModule;
}
```

The module's `root` path must be blank, eg.

```
const recipesRoutes: Routes = [
    { path: '',
        component: RecipesComponent,
        children: [ ... ]
    },
];
```

### Legacy declarations

Older versions of Angular support the syntax

```
const applicationRoutes: Routes = [
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModulle' },
];
```

but this failed using Angular 9

## Service scope

![services & modules](./images/module-services.png)

Modules can declare services scoped to themselves.

Services can also be declared in `app.module.ts` (application root).

When done, the application will contain multiple instances of a service, with different parts of the application using different instances.

To avoid bugs, always declare services using `@Injectable({providedIn: 'root'})`
