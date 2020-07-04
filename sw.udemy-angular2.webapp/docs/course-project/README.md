# Course Project

Application created by the `Course Project` section of the course.

To build / enable:

```bash
$ pushd sw.udemy-angular2.webapp/src/main
$ rm web
$ ln -s course-project web
$ popd
$ mvn clean install
```

## Create project

[Contents](./create-project.md):

1. Planning the application
1. Adding bootstrap (the correct way)
1. Creating components using `ng`
1. Shorthand declarations

## Development Tools

[Contents](./development-tools.md):

1. Live develoipment server
1. Debugging

## Components

[Contents](./components.md):

1. Lifecycle hooks

## Property & Event Binding

[Contents](./property-binding.md):

1. One-way binding, eg. `{{ }}`
1. Two-way binding using `ngModel`
1. Binding to HTML elements, eg. `@ViewChild`
1. Passing data into components using `@Input`
1. Publishing data from components using `@Output`

## Directives

[Contents](./directives.md):

1. Core directives, eg. `ngIf`
1. Custom directives
1. Default property binding

## Observables

[Contents](./observables.md):

1. Custom observables
1. Converting published data using `Operators`
1. Cross-component communications using `Subjects`

## Services

[Contents](./services.md):

1. Cross-component communication
1. Dependency injection

## Routes

[Contents](./routes.md):

1. External routing modules
1. Route parameters
1. Query parameters & fragments
1. Styling links
1. Redirection & wildcards
1. {`canActivate`, `canDeactivate`, `resolve`} guards

## Forms

[Contents](./forms-reactive-approach.md):

1. Model based setup
1. Built-in validators
1. Custom validators
1. Displaying validation errors
1. Tracking form state using [Observables](./observables.md)
1. Dynamic form controls
1. [Template-Driven](./forms-template-driven.md) forms

