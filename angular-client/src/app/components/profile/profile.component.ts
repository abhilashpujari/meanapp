import { Component, OnInit } from '@angular/core';

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
    private flashMessageService: FlashMessageService,
    private profileService : ProfileService
  ) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(data => {
      this.user = 'Hello';
      if (data.success) {
          //this.user = data.user;
      } else {}
    });
  }

}
