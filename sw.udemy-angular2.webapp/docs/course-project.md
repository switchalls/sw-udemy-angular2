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

## Planning the application

![Plan](images/application-plan.png)

## Adding bootstrap (the correct way)

`The Basics` added `bootstrap` by following [medium.com](https://medium.com/codingthesmartway-com-blog/using-bootstrap-with-angular-c83c3cee3f4a)

However ... what you should do is ...

* Install plugin using `npm`, eg.
  
  ```bash
  $ npm install bootstrap@3 jquery --save
  ```

* Update `angular.json` (to bundle bootstrap with the application), eg.

  ```
  "styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "src/styles.css"
  ],
  "scripts": [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js"
  ]
  ```

