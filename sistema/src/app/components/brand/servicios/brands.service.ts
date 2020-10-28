import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Brands } from '../interfaces/brand';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {

  }
  getBrand() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'brands',{ headers: headers });
  }
  save(brand: Brands) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'brands', brand, { headers: headers });
  }
  put(id) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.put(this.API_ENDPOINT + 'brands/' + id.Brand_Id, id, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.delete(this.API_ENDPOINT + 'brands/' + id, { headers: headers });
  }
  findbrand(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'brands/'+id,{ headers: headers })
  }
}

