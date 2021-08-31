import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  private baseURL='http://localhost:3000';

  constructor(private httpClient:  HttpClient) { }
  readAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseURL}/customers`);
  }

  read(id): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseURL}/customers/${id}`);
  }

  create(data): Observable<Customer[]> {
    return this.httpClient.post<Customer[]>(this.baseURL, data);
  }

  update(id, data: Customer): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/customers/${id}`, data, {responseType: 'text'});
  }

  delete(id): Observable<Customer[]> {
    return this.httpClient.delete<Customer[]>(`${this.baseURL}/customers/${id}`);
  }

  deleteAll(): Observable<Customer[]> {
    return this.httpClient.delete<Customer[]>(this.baseURL);
  }

  searchByName(name): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseURL}?name=${name}`);
  }


}
