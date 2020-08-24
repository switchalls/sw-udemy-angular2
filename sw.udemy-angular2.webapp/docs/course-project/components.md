# Components

## Lifecycle Hooks

![Lifecycle](images/component-lifecycle-hooks.png)

## Dynamic Components

Normally, you would use `*ngIf`, eg.

```
<div *ngIf="error != null">
    <app-alert [message]="error" (closed)="onAlertClosed()"></app-alert>
</div>
```

But, sometimes you want to create components programmatically.

### Programmatic creation

* Declare placeholder in HTML, eg. `auth.component.html`
  
  ```
  <ng-template appPlaceholder></ng-template>
  ```
  
  The placeholder will provide access to the `ViewContainerRef` (injection point).

* Inject placeholder into component, eg. `auth.component.ts`
  
  ```
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  ```

* Use placeholder and `ComponentFactoryResolver` to create the new component, eg. `auth.component.ts`
  
  ```
  const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
    AlertComponent
  );
  
  const viewContainerRef = this.alertHost.viewContainerRef;
  
  viewContainerRef.clear(); // remove anything that has been rendered
  
  const newAlert = viewContainerRef.createComponent(alertComponentFactory);
  
  newAlert.instance.message = errorMessage;
  ```

Use `viewContainerRef.clear()` to remove the new component, eg. close the pop-up
