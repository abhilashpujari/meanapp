import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

import { ValidatorService } from '../../services/validator/validator.service';
import { FlashMessageService } from '../../services/flash-message/flash-message.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: string;
  password: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private flashMessageService: FlashMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }


  isFieldValid(field: string) {
    return ((!this.loginForm.get(field).valid && this.loginForm.get(field).touched));
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onLoginSubmit() {
    var user = {
      email: this.email,
      password: this.password
    };

    // Check form is validated
    if (this.loginForm.valid) {
      this.authService.loginUser(user).subscribe(data => {
        if (data.success) {
          this.authService.setSession(data);
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessageService.error('', data.message);
          this.router.navigate(['/login']);
        }
      });
    } else {
      return false;
    }
  }
}