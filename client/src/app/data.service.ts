import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
  
export class DataService {
  
  private baseURL='http://localhost:3000';

  constructor(private httpClient:  HttpClient) { }

  /*httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${this.baseURL}`
    })
  }*/

  readAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/users`);
  }

  read(id): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/users/${id}`);
  }
  readCustomer(id): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/users/?filter[where][customerId]=${id}`);
  }

  create(data): Observable<User[]> {
    return this.httpClient.post<User[]>(this.baseURL, data);
  }

  update(id, data): Observable<any> {
    
    return this.httpClient.put(`${this.baseURL}/users/${id}`, data, { responseType: 'json'});
  }

  delete(id): Observable<User[]> {
    return this.httpClient.delete<User[]>(`${this.baseURL}/users/${id}`);
  }

  deleteAll(): Observable<User[]> {
    return this.httpClient.delete<User[]>(this.baseURL);
  }

  searchByName(name): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}?name=${name}`);
  }
}
