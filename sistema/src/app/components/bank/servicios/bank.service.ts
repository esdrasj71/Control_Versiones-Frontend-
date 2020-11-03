import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bank } from '../interfaces/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {
  }
  get() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.get(this.API_ENDPOINT + 'bank', { headers: headers });
  }
  save(bank: Bank) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.post(this.API_ENDPOINT + 'bank', bank, { headers: headers });
  }
  put(id) { 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.put(this.API_ENDPOINT + 'bank/' + id.Bank_Id, id, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.delete(this.API_ENDPOINT + 'bank/' + id, { headers: headers });
  }
  findbank(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.get(this.API_ENDPOINT + 'bank/' + id, { headers: headers })
  }
}
