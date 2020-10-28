import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Purchase_Header } from '../interfaces/purchase-header';
@Injectable({
  providedIn: 'root'
})
export class PurchaseHeaderService {
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }
  save(purchase_header: Purchase_Header) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','accesstoken': localStorage.getItem('token') });
    return this.httpClient.post(this.API_ENDPOINT + 'purchase_header', purchase_header, { headers: headers });
  }
}
