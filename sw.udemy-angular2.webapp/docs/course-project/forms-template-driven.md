# Forms (Template-Driven)

## HTML Template

```
<form (ngSubmit)="onSubmit(f)" #f="ngForm">
    <div id="user-data" ngModelGroup="userData">
        <div class="form-group">
            <label for="username">Username</label>
            <input
                type="text"
                id="username"
                class="form-control"
                ngModel
                name="username" >
        </div>
    </div>
    ...
    <button
        class="btn btn-primary"
        type="submit"
        [disabled]="!f.valid"
        >Submit</button>
</form>
```

*NB.* No `form/@action` or `form/@method`

Use `ngModel` to identify which HTML elements should be included in the form's data.

`ngModel` uses `name` as the control's identifier.

Use `#name="ngForm"` to pass Angular's internal representation of the form into the model, eg.

```
onSubmit(form: ngForm) {
    console.log(form.value.userData.username);
    console.log(form.valid);
}
```

Use `ngModelGroup` to group input(s) together, eg. `form.value.userData.*`

## Property binding

Use one-way property binding to inject default values, eg.

```
<input ... [ngModel]="myProperty" >
```

Use `ngModel` to enable two-way binding, eg.

```
<div class="form-group">
    <textarea
        class="form-control"
        name="questionAnswer"
        rows="3"
        [(ngModel)]="answer"></textarea>
</div>
<p>Your reply: {{ answer }}</p>
```

Use `patchValue()` to set values inside the form from the model, eg.

```
@ViewChild('f') myform: ngForm;

onSuggestName() {
    this.myform.form.patchValue({
        userData: {
            username: "any name"
        }
    });
} 
```

Use `myform.reset()` to reset form state and controls.

## Form Validation

Use HTML attribute `required` to indicate mandatory fields, eg.

```
<input ngModel name="username" required>
```

Enable validation using Angular's built-in `forms/*Validator` [directives](https://angular.io/api?type=directive), eg.

```
<input ngModel name="username" required maxlength="25">
```

Use CSS to visually mark controls as invalid, eg.

```
input.ng-invalid.ng-touched {
    border: 1px solid red
}
```

Display error text using `#name="ngModel"`, eg.

```
<input
    ...
    required email
    #emailInput="ngModel">
<span
    class="help-block"
    *ngIf="!emailInput.valid && emailInput.touched"
    >Enter valid email</span>
```

Error messages can also be applied to `ngModelGroup`(s), eg.

```
<div id="user-data" ngModelGroup="userData" #userDataGroup="ngModel">
    ...
</div>
<p *ngIf="!userDataGroup.valid && userDataGroup.touched">Enter valid user-data group</p>
```
