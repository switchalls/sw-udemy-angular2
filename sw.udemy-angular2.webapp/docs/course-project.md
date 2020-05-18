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

## Creating the components

Use `ng generate component`

`--skip false` (used in course notes) changed to `--skipTests=true`

```bash
$ cd sw.udemy-angular2.webapp/src/main/web
$ ng g c recipes --skipTests=true
CREATE src/app/recipes/recipes.component.css (0 bytes)
CREATE src/app/recipes/recipes.component.ts (297 bytes)
UPDATE src/app/app.module.ts (645 bytes)
$ ng g c recipes/recipe-list --skipTests=true
CREATE src/app/recipes/recipe-list/recipe-list.component.css (0 bytes)
CREATE src/app/recipes/recipe-list/recipe-list.component.ts (312 bytes)
UPDATE src/app/app.module.ts (758 bytes)
$ ng g c recipes/recipe-detail --skipTests=true
CREATE src/app/recipes/recipe-detail/recipe-detail.component.css (0 bytes)
CREATE src/app/recipes/recipe-detail/recipe-detail.component.ts (320 bytes)
UPDATE src/app/app.module.ts (879 bytes)
$ ng g c recipes/recipe-list/recipe-item --skipTests=true
CREATE src/app/recipes/recipe-list/recipe-item/recipe-item.component.css (0 bytes)
CREATE src/app/recipes/recipe-list/recipe-item/recipe-item.component.ts (312 bytes)
UPDATE src/app/app.module.ts (1005 bytes)
$ ng g c shopping-list --skipTests=true
CREATE src/app/shopping-list/shopping-list.component.css (0 bytes)
CREATE src/app/shopping-list/shopping-list.component.ts (316 bytes)
UPDATE src/app/app.module.ts (1113 bytes)
$ ng g c shopping-list/shopping-edit --skipTests=true
CREATE src/app/shopping-list/shopping-edit/shopping-edit.component.css (0 bytes)
CREATE src/app/shopping-list/shopping-edit/shopping-edit.component.ts (316 bytes)
UPDATE src/app/app.module.ts (1235 bytes)
```

![Creating the components](images/creating-the-components.png)

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

## Bean declarations

```
export class Recipe {
    constructor(public name: string, public description: string, public imagePath: string) {
    }
}
```

is shorthand for ...

```
export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(name: string, description: string, imagePath: string) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
    }
}
```

## Debugging tools

* [Augury](https://augury.rangle.io/)

## Property & Event Binding

![Title](images/property-and-event-binding.png)

* Two-way property binding
  
  ```
  <input ... [(ngModel)] = "serverName" />
  
  <button (onclick)="onAddServer($event)">Add</button>
  
  export class CockpitComponent {
      serverName = '';
      
      onAddServer(onclickEvent: MouseEvent) {
        console.log(serverName);
      }
  }
  ```

* Passing references to HTML elements
  
  ```
  <input ... #serverNameInput />
  
  <button (onclick)="onAddServer(#serverNameInput)">Add</button>

  export class CockpitComponent {
      onAddServer(serverNameInput: HTMLInputElement) {
        console.log(serverNameInput.value);
      }
  }
  ```

* Binding directly to HTML elements
  
  ```
  <input ... #serverNameInput />
  
  export class CockpitComponent {
      @ViewChild('serverNameInput') serverNameInput: ElementRef;

      onAddServer() {
        console.log(serverNameInput.nativeElement.value);
      }
  }
  ```

* Passing data into components
  
  ```
  export class ServerElementComponent {
      @Input() serverElement: {type: string, name: string, content: string};
  }
    
  <app-server-element
      *ngFor="let e of serverElements"
      [serverElement]="e"
  ></app-server-element
  ```

* Sending data from components
  
  ```
  export class CockpitComponent {  
      @Output serverCreated = new EventOmitter<{serverName: string, serverContent: string}>();
      
      onAddServer(serverNameInput: HTMLInputElement, serverContentInput: HTMLInputElement) {
        serverCreated.emit({serverName: serverNameInput.value, serverContent: serverContentInput.value});
      }
  }
  
  <app-cockpit (serverCreated)="onServerAdded($event)"></<app-cockpit>
  
  export class AppComponent {
      onServerAdded(serverData: {serverName: string, serverContent: string}) {
        console.log(serverData.serverName);
      }
  }
  ```

* Passing HTML content into components

  `server-element.component.html`
  ```
  <div class="panel-body">
      <ng-content></ng-content>
  </div>
  ```
  
  `app.component.html`
  ```
  <app-server-element *ngFor="let e of serverElements">
      <p>
          <strong *ngIf="e.type === 'server'">{{ e.content }}</strong>
          <em *ngIf="e.type === 'blueprint'">{{ e.content }}</em>
      </p>
  </app-server-element
  ```

## Component Lifecycle Hooks

![Lifecycle](images/component-lifecycle-hooks.png)


