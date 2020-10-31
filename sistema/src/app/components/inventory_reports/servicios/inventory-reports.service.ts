import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryReport1 } from '../interfaces/report1';

@Injectable({
  providedIn: 'root'
})
export class InventoryReportsService {

  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {

   }
  showreport1(inventory_report1: InventoryReport1) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'inventory_report1', inventory_report1, { headers: headers });
  }
}
