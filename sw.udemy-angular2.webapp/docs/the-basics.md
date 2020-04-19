# The Basics

Application created by the `The Basics` section of the course.

To build / enable:

```bash
$ pushd sw.udemy-angular2.webapp/src/main
$ rm web
$ ln -s the-basics web
$ popd
$ mvn clean install
```

## Adding bootstrap

Followed instructions from `medium.com` [tutorial](https://medium.com/codingthesmartway-com-blog/using-bootstrap-with-angular-c83c3cee3f4a), eg.

```bash
$ npm install bootstrap@3 jquery --save
```

*NB.* `package.json` automatically updated, eg.

```
  "dependencies": {
    "bootstrap": "^3.4.1",
    "jquery": "^3.4.1",
```

Manually added CSS and `script` imports to `src/index.html`

```
<head>

  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
    crossorigin="anonymous">

<body>

  <script
    src="https://code.jquery.com/jquery-3.1.1.min.js"
    integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
    crossorigin="anonymous"></script>

  <script
    src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
    crossorigin="anonymous"></script>
```

Added `src/app/app.component.html` from `medium.com`

## Angular Live Development Server

```bash
$ cd sw.udemy-angular2.war/src/main/web/
$ ng serve
```

## Adding modules

Use `ng` to auto generate components, eg.

```bash
$ cd sw.udemy-angular2.war/src/main/web/
$ ng generate component servers
```

Added components:
* `server/servers.component` - Displays multiple `server.component`
* `server/server.component`

## Data binding

One way data binding, eg.

```
<input
    type="text"
    class="form-control"
    (input) = "onServerNameChanged($event)" />

<p>serverName = <span [innerText] = "serverName"></span></p> 
```

Two way data binding, eg.

```
<input
    type="text"
    class="form-control"
    [(ngModel)] = "serverName" />
```

## Directives

`*` = change DOM, eg.

```
<p *ngIf = "serverAdded">Server created: {{ serverName }}</p> 
```

only add `paragraph` element if ...
