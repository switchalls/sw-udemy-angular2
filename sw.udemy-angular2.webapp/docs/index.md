# Udemy Angular2 Applications(s)

Module contains the webapp(s) created by multiple sections of the course

* [The Basics](the-basics.md) - Simple webapp covering Angular 2 basic constructs

* [Course Project](course-project.md) - The larger more complex webapp

## Setup developer environment

Install [angular-cli](https://cli.angular.io/), eg.

```bash
$ brew install angular-cli
```

Create a *new* angular project, eg.

```bash
$ cd sw.angular.io-example.webapp/src/main
$ ng new -skip-git np-app
? Would you like to add Angular routing? No
? Which stylesheet format would you like to use? CSS
```

Change `npm` output in `angular.json`

```json
"builder": "@angular-devkit/build-angular:browser",
"options": {
    "outputPath": "../../../target/dist",
```

## Lessons learnt

See [trouble shooting](trouble-shooting.md)

## Extra reading

* JavaScript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

* [Bootstrap toolkit](./bootstrap-toolkit.md)

* [Internationalisation](https://angular.io/guide/i18n)

* [Material components](https://material.angular.io/components/)

* [Angular vs React vs Vue](https://www.codeinwp.com/blog/angular-vs-vue-vs-react/)

* [Pros & cons](https://medium.com/@TechMagic/reactjs-vs-angular5-vs-vue-js-what-to-choose-in-2018-b91e028fa91d)

