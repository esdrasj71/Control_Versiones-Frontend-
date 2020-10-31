import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PurchaseReport2 } from '../interfaces/report2';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReports2Service {

  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {

   }
   showreport2(purchase_report2: PurchaseReport2) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'purchase_report2', purchase_report2, { headers: headers });
  }
}
