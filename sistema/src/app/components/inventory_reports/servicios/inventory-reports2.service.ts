import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryReport2 } from '../interfaces/report2';

@Injectable({
  providedIn: 'root'
})
export class InventoryReports2Service {
  
  API_ENDPOINT = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { 

  }
  showreport2(inventory_report2: InventoryReport2) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'inventory_report2', inventory_report2, { headers: headers });
  }
}
