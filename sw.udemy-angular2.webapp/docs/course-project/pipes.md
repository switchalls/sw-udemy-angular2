# Pipes

See [overview](https://angular.io/guide/pipes)

For example,

```
{{ server.started | date:'fullDate' | uppercase }}
```

## Custom pipes

* Create file, eg. `example.pipe.ts`
  
  ```
  @Pipe({
    name: 'shorten'
  })
  export class ShortenPipe implements PipeTransform {
  
      transform(value: any, limit: number) {
          if (value.length < limit) {
             return value;
          }
          return value.substr(0, limit) + ' ...';
      }
  
  }
  ```

* Declare pipe in `app.module.ts`, eg.
  
  ```
  @NgModule ({
      declarations: [
          ShortenPipe
      ]
  ```

* Use pipe in `*.component.html`, eg.
  
  ```
  {{ server.name | shorten:10 }}
  ```

## Custom pipelines

Use `ng generate pipe <name>` to create the new `pipe`, eg.

```
@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {

    transform(value: any, filter: string, property: string) {
        if (value.length === 0) {
            return value;
        }

        const pipeResult = [];
        for (const item of value) {
            if (item[property] === filter) {
                pipeResult.push(item);
            }
        }

        return pipeResult;
    }
  
}
```

... and use in `*ngFor`, eg.

```
<input type="text" [(ngModel)]="filteredStatus" />
<ul class="list-group">
    <li
        class="list-group-item"
        *ngFor="let server of servers | filter:filteredStatus:'status'"
        >{{ server.name | shorten:10 }}</li>
```

Pipes are re-run when any pipe parameter (eg. `filteredStatus`) is changed.

However, changing the source data (eg. `servers`) will *not* re-run the pipe when `pure=true`.

To make pipes re-run when source data is changed, set `pure=false` (as above).

*NB.* Angular defaults `pure=true` to avoid performance issues

## Async pipes

`async` forces Angular to track the status of the `Promise` and only render a value when it resolves, eg.

```
export class AppComponent {

    appStatus: new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('stable');
        }, 2000);
    });

}

<h2>Status: {{ appStatus | async }}</h2>
```


