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

### Compiler output

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

eg. [firebase](./firebase.md) hosting

