# Development Tools

## Live Development Server

Applications can run using the `ng serve`, eg.

```bash
$ cd sw.udemy-angular2.webapp/src/main/web
$ ng serve

chunk {main} main.js, main.js.map (main) 29.1 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 141 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 6.15 kB [entry] [rendered]
chunk {scripts} scripts.js, scripts.js.map (scripts) 126 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 978 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 3.11 MB [initial] [rendered]
Date: 2020-05-10T18:40:24.396Z - Hash: 316a72c5e94e8a7a39cf - Time: 4995ms
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
: Compiled successfully.
```

The server will automatically rebuilt the application whenever changes are made.

## Angular CLI

Use `--dry-run` to simulate cli execution.

Use `--skip-tests` to skip `*.spec.ts` generation.

Use `ng new <name>` to create new projects

Use `ng generate <type>` to create new source files, eg. `component`

Use `ng lint` for coding recommendations, eg.

```
$ ng lint
Linting "udemy-angular2"...

ERROR: src/main/course-project/src/app/app-header/app-header.comoponent.ts:54:13 - " should be '
ERROR: src/main/course-project/src/app/store/app.reducer.ts:8:41 - Missing semicolon
ERROR: src/main/course-project/src/app/shared/shorten.pipe.spec.ts:10:13 - Identifier 'testSubject' is never reassigned; use 'const' instead of 'let'.
```

Use `ng update` to upgrade projects to the latest Angular version, eg.

```
$ ng update
Your global Angular CLI version (10.0.8) is greater than your local
version (9.0.7). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".
The installed local Angular CLI version is older than the latest stable version.
Installing a temporary version to perform the update.
Installing packages for tooling via npm.
Installed packages for tooling via npm.
Using package manager: 'npm'
Collecting installed dependencies...
Found 34 dependencies.
    We analyzed your package.json, there are some packages to update:

      Name                               Version                  Command to update
     --------------------------------------------------------------------------------
      @angular/cli                       9.0.7 -> 10.1.2          ng update @angular/cli
      @angular/core                      9.0.7 -> 10.1.2          ng update @angular/core
      @ngrx/store                        9.2.0 -> 10.0.0          ng update @ngrx/store
      rxjs                               6.5.5 -> 6.6.3           ng update rxjs
```

### Project files

`angular.json` configures the CLI, eg. sets build flags

`browserslist` configures browser support, eg. IE 9

*NB.* Renamed to `.browserslistrc` in Angular 10

`karma.config.js` configures unit test framework ; do not change

`package.json` configures the application framework

`tsconfig.*` configure the TypeScript compiler ; do not change

### Angular CLI Schematics

![schematics](./images/angular-schematics.png)

`ng add @angular/material` installs the [material](https://material.angular.io/) package using its `add` schematic

`ng generate @angular/material:nav main -nav` adds a [sidenav](https://material.angular.io/components/sidenav/overview) component using its `generate sidenav` schematic

### Builders

![builders](./images/angular-builders.png)

See [angular-io](https://angular.io/guide/cli-builder)

*NB.* Before starting, change the build output location (`angular.json`) to `./dist`, eg.

```
{
  "projects": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist",
```

Use `ng add` to install the firebase builders, eg.

```
$ ng add @angular/fire
Installing packages for tooling via npm.
Installed packages for tooling via npm.
UPDATE package.json (1682 bytes)
✔ Packages installed successfully.
✔ Preparing the list of your Firebase projects
? Please select a project: ng-recipe-book (ng-recipe-book-ba17b)
CREATE firebase.json (668 bytes)
CREATE .firebaserc (156 bytes)
UPDATE angular.json (4026 bytes)
```

Use `ng deploy` to deploy the application to firebase, eg.

```
$ firebase login
Already logged in as yellow.monkey.sw@gmail.com

$ ng deploy
📦 Building "udemy-angular2"
Generating ES5 bundles for differential loading...
ES5 bundle generation complete.

chunk {2} polyfills-es2015.6022d6f28e0500e60d30.js (polyfills) 36.1 kB [initial] [rendered]
chunk {3} polyfills-es5.6e1055b712d0b250b19e.js (polyfills-es5) 129 kB [initial] [rendered]
chunk {0} runtime-es2015.0043c1afd270e67c0236.js (runtime) 2.24 kB [entry] [rendered]
chunk {0} runtime-es5.0043c1afd270e67c0236.js (runtime) 2.23 kB [entry] [rendered]
chunk {5} 5-es2015.5b7b0631db8c2bc83f15.js () 11.8 kB  [rendered]
chunk {5} 5-es5.5b7b0631db8c2bc83f15.js () 13.9 kB  [rendered]
chunk {1} main-es2015.4344237ce1e523de2a18.js (main) 413 kB [initial] [rendered]
chunk {1} main-es5.4344237ce1e523de2a18.js (main) 487 kB [initial] [rendered]
chunk {4} styles.ade68dc18282addee3d2.css (styles) 112 kB [initial] [rendered]
chunk {scripts} scripts.8b9aae9cada5ffe0c629.js (scripts) 126 kB [entry] [rendered]
Date: 2020-09-18T11:35:50.056Z - Hash: 1e0b512a179c1ff799da - Time: 16215ms

=== Deploying to 'ng-recipe-book-ba17b'...

i  deploying hosting
i  hosting[ng-recipe-book-ba17b]: beginning deploy...
i  hosting[ng-recipe-book-ba17b]: found 18 files in dist
✔  hosting[ng-recipe-book-ba17b]: file upload complete
i  hosting[ng-recipe-book-ba17b]: finalizing version...
✔  hosting[ng-recipe-book-ba17b]: version finalized
i  hosting[ng-recipe-book-ba17b]: releasing new version...
✔  hosting[ng-recipe-book-ba17b]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/ng-recipe-book-ba17b/overview
Hosting URL: https://ng-recipe-book-ba17b.web.app
```

## Debugging tools

* [Augury](https://augury.rangle.io/)

## Environment variables

See `src/environments/environment.ts` and `src/environments/environment.prod.ts`

Declare key / value pairs, eg.

```
export const environment = {
  firebaseKey: 'AIzaSyDUw0zMxJHT2_zv1do50pRpB2daGxCpPa8'
};
```

Then, import and use, eg.

```
import { environment } from '../../environments/environment'

signUp(email: string, password: string) {
    return this.http.post<AuthServiceResponse>(this.accountsUrl + ':signUp?key=' + environment.firebaseKey, { ... }).pipe( ... );
}
```

*NB.* The Angular compiler will automatically swap `environment.ts` with `environment.prod.ts` when running production builds.

## Ahead-of-time compilation

![preparation](./images/deployment-preparation.png)

Use `ng build` to compile the application, eg.

```
$ ng build --prod
Generating ES5 bundles for differential loading...
ES5 bundle generation complete.

chunk {0} runtime-es2015.e671edf2cab7fb392c95.js (runtime) 2.24 kB [entry] [rendered]
chunk {0} runtime-es5.e671edf2cab7fb392c95.js (runtime) 2.23 kB [entry] [rendered]
chunk {2} polyfills-es2015.1f913f16a2d346cc8bdc.js (polyfills) 36.1 kB [initial] [rendered]
chunk {5} 5-es2015.73ec35be4663e4ea0e9c.js () 11.5 kB  [rendered]
chunk {5} 5-es5.73ec35be4663e4ea0e9c.js () 13.9 kB  [rendered]
chunk {3} polyfills-es5.1a3c78b07cd6f16c6e9a.js (polyfills-es5) 129 kB [initial] [rendered]
chunk {1} main-es2015.f6d18d1bee08e6425f96.js (main) 315 kB [initial] [rendered]
chunk {1} main-es5.f6d18d1bee08e6425f96.js (main) 378 kB [initial] [rendered]
chunk {4} styles.2bd6ebdb59cfadfe33c4.css (styles) 112 kB [initial] [rendered]
chunk {scripts} scripts.a80dc973dc4808ebd09d.js (scripts) 126 kB [entry] [rendered]
Date: 2020-08-28T20:32:10.764Z - Hash: 9478425b953c4a0613b3 - Time: 29677ms
```

*NB.* The `ng build` compiler is less tolerant than `ng serve`. This may trigger compilation failures.

### Build output

Compiler output location defined in `angular.json`, eg.

```
{
  "projects": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "../../../target/dist",
```

The generated files will be created in `outputPath`, eg.

```
$ ls -al ../../../target/dist
total 2800
drwxr-xr-x  20 stewartw  1390471550     640 28 Aug 22:19 .
drwxr-xr-x   6 stewartw  1390471550     192 28 Aug 22:19 ..
-rw-r--r--   1 stewartw  1390471550   25864 28 Aug 22:19 3rdpartylicenses.txt
-rw-r--r--   1 stewartw  1390471550   11742 28 Aug 22:19 5-es2015.73ec35be4663e4ea0e9c.js
-rw-r--r--   1 stewartw  1390471550   14242 28 Aug 22:19 5-es5.73ec35be4663e4ea0e9c.js
-rw-r--r--   1 stewartw  1390471550     948 28 Aug 22:19 favicon.ico
-rw-r--r--   1 stewartw  1390471550   18028 28 Aug 22:19 glyphicons-halflings-regular.448c34a56d699c29117a.woff2
-rw-r--r--   1 stewartw  1390471550  108738 28 Aug 22:19 glyphicons-halflings-regular.89889688147bd7575d63.svg
-rw-r--r--   1 stewartw  1390471550   45404 28 Aug 22:19 glyphicons-halflings-regular.e18bbf611f2a2e43afc0.ttf
-rw-r--r--   1 stewartw  1390471550   20127 28 Aug 22:19 glyphicons-halflings-regular.f4769f9bdb7466be6508.eot
-rw-r--r--   1 stewartw  1390471550   23424 28 Aug 22:19 glyphicons-halflings-regular.fa2772327f55d8198301.woff
-rw-r--r--   1 stewartw  1390471550     896 28 Aug 22:19 index.html
-rw-r--r--   1 stewartw  1390471550  322766 28 Aug 22:19 main-es2015.75d16997da0325d10100.js
-rw-r--r--   1 stewartw  1390471550  386749 28 Aug 22:19 main-es5.75d16997da0325d10100.js
-rw-r--r--   1 stewartw  1390471550   36993 28 Aug 22:19 polyfills-es2015.1f913f16a2d346cc8bdc.js
-rw-r--r--   1 stewartw  1390471550  132187 28 Aug 22:19 polyfills-es5.1a3c78b07cd6f16c6e9a.js
-rw-r--r--   1 stewartw  1390471550    2289 28 Aug 22:19 runtime-es2015.e671edf2cab7fb392c95.js
-rw-r--r--   1 stewartw  1390471550    2286 28 Aug 22:19 runtime-es5.e671edf2cab7fb392c95.js
-rw-r--r--   1 stewartw  1390471550  128625 28 Aug 22:19 scripts.a80dc973dc4808ebd09d.js
-rw-r--r--   1 stewartw  1390471550  114644 28 Aug 22:19 styles.2bd6ebdb59cfadfe33c4.css
```

## Application hosting

See `Angular CLI/Builders` above

Or, see manual steps for [firebase](./firebase.md) hosting

