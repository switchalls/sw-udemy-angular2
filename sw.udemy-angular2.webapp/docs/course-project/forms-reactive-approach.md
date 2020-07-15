# Forms (Reactive Approach)

Identify form content, set defaults and enable validation via the model.

## Model based setup

```
export class SignupComponent implements OnInit {
    genders: {'male', 'female'}
    signupForm: FormGroup;

    ngOnInit() {
        this.signupForm = new FormGroup({
            'username': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'gender': new FormControl(genders[0])
        });
    }

    onSubmit() {
        console.log(this.signupForm.value.username);
        console.log(this.signupForm.valid);
    }
}
```

Use {`formGroup`, `formGroupName`, `formControlName`} directives to bind the typescript form to the HTML elements, eg.

```
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
        <label for="username">Username</label>
        <input
            type="text"
            id="username"
            class="form-control"
            formControlName="username" >
    </div>
```

*NB.* The `formGroup` directive is wrapped with `[]` because it uses property binding.

## Custom validators

For example, reject some usernames.

```
ngOnInit() {
    this.signupForm = new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
    });
}

forbiddenName(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Chris') {
        return {'nameIsForbidden': true};
    }
    return null; // value is valid
}
```

*NB.* `[s: string]` is typescript syntax for a key of type string containing any value

*NB.* Use `bind(this)` to permit use of `this` inside the validator.

If the validator cannot return immediately, use an async validator, eg.

```
asyncForbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>( (resolve, reject) => {
        setTimeout( () => {
            if (control.value === "test@test.com") {
                resolve({'emailIsForbidden': true});
            } else {
                resolve((null);
            }
        }, 1500);
    });
}
```

## Displaying validation errors

Use CSS to visually mark controls as invalid, eg.

```
input.ng-invalid.ng-touched {
    border: 1px solid red
}
```

Use `signupForm.get()' to access individual controls in directives, eg.

```
<span
    class="help-block"
    *ngIf="!signupForm.get('email').valid && signupForm.get('email').touched"
    >Enter valid email</span>
```

Use validator codes to generate specialised error messages, eg.

```
<span
    class="help-block"
    *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched">

    <span *ngIf="signupForm.get('username').errors['nameIsForbidden']">Username is forbidden</span>
    <span *ngIf="signupForm.get('username').errors['required']">Enter a username</span>
</span>
```

## Tracking form state

```
this.myform.statusChanges.subscribe( (status) => {
    console.log("Form status changed: "+ status); // {INVALID, PENDING, VALID}
});

this.myform.valueChanges.subscribe( (value) => {
    console.log("Form content changed: "+ value);
});
```

You can also listen to value changes on individual form controls.

## Dynamic form controls

Dynamically adding new controls at runtime, eg. the contents of a list.

```
ngOnInit() {
    this.myform = new FormGroup({
        ...
        'hobbies': new FormArray([])
    });
}

getHobbyControls() {
    return (<FormArray>this.myform.get('hobbies')).controls;
}

onAddHobby() {
    const newControl = new FormControl(null, Validators.required);
    (<FormArray>this.myform.get('hobbies')).push(newControl);
}

onSubmit() {
    if (this.myform.value.hobbies.length > 0) {
        console.log("First hobby = " + this.signupForm.value.hobbies[0]);
    }
}
```

Use {`formArrayName`, `formControlName`} directives to bind the `FormArray` to the HTML elements, eg.

```
<div formArrayName="hobbies">
    <h4>Hobbies</h4>
    <button
        type="button"
        class="btn btn-default"
        (click)="onAddHobby">Add hobby</button>

    <div
        class="form-group"
        *ngFor="let hobbyControl of getHobbyControls(); let i = index">

        <input
            type="text"
            class="form-control"
            [formControlName]="i">
    </div>
</div>
```

Controls are added to a `FormArray` using their `index` as their name.

*NB.* `this.signupForm.get('hobbies')` must be cast to `<FormArray>` to avoid javascript errors ; see `getHobbyControls()`
