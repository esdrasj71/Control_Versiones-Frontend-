import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BillType } from '../interfaces/bill-type';

@Injectable({
  providedIn: 'root'
})
export class BillTypeService {

  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {
  }
  get() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.get(this.API_ENDPOINT + 'billtype', { headers: headers });
  }
  save(billtype: BillType) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.post(this.API_ENDPOINT + 'billtype', billtype, { headers: headers });
  }
  put(id) { 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.put(this.API_ENDPOINT + 'billtype/' + id.Bill_Type_Id, id, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.delete(this.API_ENDPOINT + 'billtype/' + id, { headers: headers });
  }
  findbilltype(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.get(this.API_ENDPOINT + 'billtype/' + id, { headers: headers })
  }
}
