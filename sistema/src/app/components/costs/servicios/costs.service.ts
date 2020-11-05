import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Costs } from '../interfaces/costs';

@Injectable({
  providedIn: 'root'
})
export class CostsService {

  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {
  }
  get() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.get(this.API_ENDPOINT + 'costs', { headers: headers });
  }
  save(costs: Costs) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.post(this.API_ENDPOINT + 'costs', costs, { headers: headers });
  }
  put(id) { 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.put(this.API_ENDPOINT + 'costs/' + id.Cost_Id, id, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.delete(this.API_ENDPOINT + 'costs/' + id, { headers: headers });
  }
  findcost(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.get(this.API_ENDPOINT + 'costs/' + id, { headers: headers })
  }
}
