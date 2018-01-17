import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';

import * as moment from "moment";
import decode from 'jwt-decode';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken : any;
  user : any;

  constructor(private http : Http) { }

  registerUser(user) {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post('http://localhost:3000/api/v1.0/user/register', user, {headers : headers}).map(res => res.json());
  }

  loginUser(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/v1.0/user/authenticate', user, {headers : headers}).map(res => res.json());
  }

  setSession(authResult) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', authResult.user);
  }          

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.authToken = this.user = null;
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
    const token = localStorage.getItem('token');
    const decoded = decode(token);
    const expiresAt = decoded.expiresIn;
    
    return moment(expiresAt);
  } 
}
