# Udemy Angular2 project (webapp)

## Adding `bootstrap`

Followed instructions from `medium.com` [tutorial](https://medium.com/codingthesmartway-com-blog/using-bootstrap-with-angular-c83c3cee3f4a), 
eg.

```bash
$ npm install bootstrap@3 jquery --save
```

*NB.* `package.json` automatically updated, eg.

```json
  "dependencies": {
    "bootstrap": "^3.4.1",
    "jquery": "^3.4.1",
```

Manually added CSS and `script` imports to `src/index.html`

```html
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