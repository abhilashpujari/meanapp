import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';

import { ValidatorService } from '../../services/validator/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  email : string;
  password : string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  isFieldValid(field: string) {
    return (
        (!this.registerForm.get(field).valid && this.registerForm.get(field).touched) ||
        (this.registerForm.get(field).untouched)
    );
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onRegisterSubmit() {
    var user = {
      email : this.email,
      password : this.password
    };

    if (this.registerForm.valid) {
      console.log('form submitted');
    }
  }

}
