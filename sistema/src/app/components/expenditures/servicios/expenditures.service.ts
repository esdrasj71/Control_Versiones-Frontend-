import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expenditures } from '../interfaces/expenditures';

@Injectable({
  providedIn: 'root'
})
export class ExpendituresService {

  API_ENDPOINT = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {

  }
  save(expenditures: Expenditures) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'expenditures', expenditures, { headers: headers });
  }
  get() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'expenditures', { headers });
  }
  getExpendituresId(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'expenditures/' + id, { headers: headers });
  }
  put(expenditures) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.put(this.API_ENDPOINT + 'expenditures/' + expenditures.Expenditures_Id
      , expenditures, { headers: headers });
  }

  delete(Expenditures_Id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.delete(this.API_ENDPOINT + 'expendituresdelete/' + Expenditures_Id, { headers: headers });
  }
}
