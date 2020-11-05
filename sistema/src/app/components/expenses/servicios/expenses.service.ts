import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expenses } from '../interfaces/expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {
  }
  get() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.get(this.API_ENDPOINT + 'expenses', { headers: headers });
  }
  save(expenses: Expenses) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.post(this.API_ENDPOINT + 'expenses', expenses, { headers: headers });
  }
  put(id) { 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.put(this.API_ENDPOINT + 'expenses/' + id.Expenses_Id, id, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.delete(this.API_ENDPOINT + 'expenses/' + id, { headers: headers });
  }
  findexpenses(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.get(this.API_ENDPOINT + 'expenses/' + id, { headers: headers })
  }
}
