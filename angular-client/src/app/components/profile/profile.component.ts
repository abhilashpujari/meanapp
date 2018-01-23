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
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router : Router,
    private flashMessageService: FlashMessageService,
    private profileService : ProfileService
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.profileService.getProfile().subscribe(data => {
      if (data.success) {
          this.user = data.user;
      } else {}
    });
  }

}
