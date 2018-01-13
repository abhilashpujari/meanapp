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
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm:FormGroup;
    email:string;
    password:string;

    constructor(
        private formBuilder:FormBuilder,
        private authService:AuthService,
        private flashMessageService:FlashMessageService,
        private router:Router
    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
        });
    }

    isFieldValid(field:string) {
        return (
            (!this.registerForm.get(field).valid && this.registerForm.get(field).touched) ||
            (this.registerForm.get(field).untouched)
        );
    }

    displayFieldCss(field:string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }

    onRegisterSubmit() {
        var user = {
            email: this.email,
            password: this.password
        };

        // Check form is validated
        if (this.registerForm.valid) {
            // Register user
            this.authService.registerUser(user).subscribe(data => {
                if (data.success) {
                    this.flashMessageService.success(data.message, '');
                    this.router.navigate(['/login']);
                } else {
                    this.flashMessageService.error(data.message, '');
                    this.router.navigate(['/register']);
                }
            });
        } else {
            return false;
        }
    }
}