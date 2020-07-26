# Http Requests

## Create example server

eg. [firebase database](./firebase.md)

## Create data types

eg. `post.model.ts`

```
export interface PostData {
    title: string;
    content: string;
    id?: string; // optional
}
```

## Http POST

```
const storageUrl = "https://udemy-angular-complete-g-d6a03.firebaseio.com/posts.json";
  
constructor(private http: HttpClient) {
}

onCreatePost(data: PostData) {
    this.http.post<{ name: string }>(
        this.storageUrl,
        data
    ).subscribe(responseData => {
        console.log(responseData);
    });
}
```

When storing data, firebase automatically returns a unique identifier for the request.

When storing data, firebase automatically creates a unique identifier for each piece of data.

Use `<>` to define type of the `Http POST` response.

*Warning -* The `Http POST` will not be sent (by the application) when no subscriber is registered.

*NB.* Angular automatically handles `unsbscribe` for the `Http POST` observable.

## Http GET

```
loadedPosts; PostData[];
isFetching: boolean;
error = null;

fetchPosts() {
    this.isFetching = true;

    this.http.get<{ [key: string]: PostData }>(
        this.storageUrl
    ).pipe(
        map(responseData => {
            const newArray: PostData[] = [];
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    newArray.put({ ...responseData[key], firebaseId: key });
                }
            }

            return newArray;
        })
    ).subscribe(
        returnedData => {
            this.isFetching = false;
            this.loadedPosts = returnedData;
        }, httpErrorResponse => {
            this.isFetching = false;
            this.error = httpErrorResponse.message;
        }
    );
}
```

Use `<>` to define type of the `Http GET` response.

*NB.* Firebase returns data as key/value pairs, where `key` is the unique identifier for the associated value (`PostData`).

Use `pipe` to transform data from key/value pairs into single array.

When using `HttpClient` in a service, service methods should return the `Http` observable and the caller `subscribe`, eg.

```
doFetch() {
    return this.http.get(...).pipe(...);
}

fetchPosts() {
    this.isFetching = true;
    doFetch.subscribe(fetchedPosts => {
        this.isFetching = false;
        this.loadedPosts = fetchedPosts;
    });
}
```

## Http headers & parameters

```
this.http.get<{ [key: string]: PostData }>(
    this.storageUrl,
    {
        headers: new HttpHeaders({
            'Custom-Header': 'customValue'
        }),
        params: new HttpParams()
            .append('print', 'pretty') // instruct firebase to pretty-print responses
            .append('customParam', 'customValue')
    });
```

## Interceptors

Mechanism for applying generic code to both Http requests and responses.

* Create interceptor, eg. `auth-interceptor.service.ts`
  
  ```
  export class AuthInterceptorService implements HttpInterceptor {
      intercept(request: HttpRequest<any>, next: HttpHandler) {
          console.log(request);
          
           const changedRequest = request.clone({
              headers: request.headers.append('customHeader', 'customValue')
           });
           
           return next.handle(changedRequest).pipe(
               tap(event => {
                   if (event.type === HttpEventType.Response) {
                       console.log('Response = ' + event.body);
                   }
               }
           );
      }
    }
  ```
  
  `request` is mutable and therefore must be cloned
  
  See [learnrxjs](https://www.learnrxjs.io/learn-rxjs/operators/utility/do) for information about `tap`

* Declare in `app.module.ts`, eg.
  
  ```
  @NgModule({
      providers: [{
          provide: HTTP_INTECEPTORS,
          useClass: AuthInterceptorService,
          multi: true 
      }]
  });
  ```
  
  `HTTP_INTERCEPTORS` declares `AuthInterceptorService` as an interceptor
  
  `multi: true` allows interceptors to be chained

## Error handling operator

```
this.http
    .get(...)
    .pipe(
        ...
        catchError(httpErrorResponse => {
            this.doGenericErrorHandling(httpErrorResponse);
    
            // propagate error to subscribers
            return throwError(httpErrorResponse)
        })
    );
```

Use `catchError` operator to handle consume error in `pipe()`

Use `throwError` to create a new observable (aka. propagate error)

