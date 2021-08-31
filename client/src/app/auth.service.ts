import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL='http://localhost:3000/users';

  constructor(private http: HttpClient,  private router: Router) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${this.baseURL}`
    })
  }
  signUp(data: User[]): Observable<User[]> {
    console.log('Data', data);
    return this.http.post<User[]>(this.baseURL + `/signup`, data );
  }
  login(credentials: { email: string, password: string }) {

    const credentialsToSend={
      email:credentials.email,
      password:credentials.password
    }
    return this.http.post(this.baseURL + `/login`, credentialsToSend)
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }
  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
