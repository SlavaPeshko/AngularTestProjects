import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators, ValidatorFn } from "@angular/forms";
import { Subscription, from, Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  myFirstReactiveForm: FormGroup;
  favoriteColorControl = new FormControl('', Validators.minLength(7));
  userTypes: string[];
  userForm: FormGroup;
  private userTypeSubscription: Subscription;
  data: Observable<any> = from(fetch('https://jsonplaceholder.typicode.com/users'));

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.userTypes = ['admin', 'user'];
    this.subscribeToUserType();
    this.data.subscribe({
      next(response) { console.log(response); },
      error(error) { console.log('Error', error); },
      complete() { console.log('Complete'); }
    });
  }

  ngOnDestroy(): void {
    this.userTypeSubscription.unsubscribe();
  }

  private toggleAddressValidators(userType): void {
    const address = this.userForm.get('address');

    const addressValidators: ValidatorFn[] = [
      Validators.required,
      Validators.minLength(3)
    ];

    if (userType !== this.userTypes[0]) {
      address.setValidators(addressValidators);
    } else {
      address.clearValidators();
    }

    address.updateValueAndValidity();
  }
  private subscribeToUserType(): void {
    this.userTypeSubscription = this.userForm.get('type')
      .valueChanges
      .subscribe(value => this.toggleAddressValidators(value));
  }

  isControleValid(controlName: string): boolean {
    const controle = this.myFirstReactiveForm.controls[controlName];

    const result = controle.invalid && controle.touched;

    return result;
  }

  isValidConfirmPassword(controlName: string): boolean {
    const controle = this.userForm.controls[controlName];

    const result = controle.invalid && controle.touched;

    return result;
  }

  onSubmitMyFirstReactiveForm() {
    if (this.myFirstReactiveForm.invalid) {
      const controls = this.myFirstReactiveForm.controls;
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      
      return;
    }

    console.log(this.myFirstReactiveForm.value);
  }

  onSubmitUserForm() {
    if (this.userForm.invalid) {
      const controls = this.userForm.controls;
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }

    console.log(this.userForm.value);
  }

  initForm() {
    this.myFirstReactiveForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/[A-z]/)
        ]
      ],
      email: ['', [
        Validators.required,
        Validators.email
        ]
      ]
    });
    this.userForm = this.fb.group({
      type: [null, [Validators.required]],
      userName: [null, [
        Validators.required,
        Validators.pattern(/^[A-z0-9]*$/),
        Validators.minLength(3)
      ]],
      address: [null],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    }, {
        validator: PasswordValidation.MatchPassword,
    })
  }
}

export class PasswordValidation  {
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password');
    let confirmPassword = abstractControl.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      console.log('not match');
      abstractControl.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      console.log('match');
      return null;
    }
  }
}
