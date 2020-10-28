import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Procedure_Purchase } from '../interfaces/procedure-purchase';
@Injectable({
  providedIn: 'root'
})
export class ProcedurePurchaseService {
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }
  save(procedure_purchase: Procedure_Purchase) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'procedure_purchase', procedure_purchase, { headers: headers });
  }
}
