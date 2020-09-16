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
1. Property getters

## Development Tools

[Contents](./development-tools.md):

1. Live development server
1. Debugging
1. Environment variables
1. Ahead-of-time compilation
1. Application hosting
1. [Testing](./testing.md)

## Components

[Contents](./components.md):

1. Lifecycle hooks
1. Dynamic components

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
1. Behaviour Subject

## Pipes

[Contents](./pipes.md):

1. Custom pipes
1. Custom pipelines
1. Async pipes
1. Changing observable type mid pipeline

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

## Http

[Contents](./http.md):

1. Http GET / POST
1. Http headers
1. Http parameters
1. Interceptors
1. Error handling operator

## Authentication

[Contents](./authentication.md):

1. Setup firebase authentication
1. Loading spinners
1. Displaying error messages
1. Sharing observable code
1. Auto inject tokens
1. Support page refresh using local storage
1. Auto redirect user to login page

## Modules

[Contents](./modules.md):

1. Declaring modules
1. Lazy loading modules
1. Service scope

## NgRx

[Contents](./ngrx.md):

1. Redux vs NgRx
1. Installation
1. Store actions
1. Store types
1. Importing action types
1. Reducers
1. Dispatching actions
1. Using store data
1. Application reducer
1. Effects
1. Dispatching actions inside resolvers
1. Loading store values inside effects
1. Developer tools

## Animations

[Contents](./animations.md)

1. Enable
1. List item animations
1. Stateful animations

