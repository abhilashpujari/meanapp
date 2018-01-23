import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service'

@Injectable()
export class ProfileService {

  constructor(private http : Http, private authService : AuthService) { }

  getProfile() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.authService.getAuthToken()}`);

    return this.http.get(`${environment.apiEndpoint}/user/profile`, {headers : headers}).map(res => res.json());
  }

}
