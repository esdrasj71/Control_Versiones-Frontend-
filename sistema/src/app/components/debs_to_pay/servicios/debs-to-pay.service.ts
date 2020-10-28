import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DebstoPay} from '../interfaces/debs-to-pay';
import { Procedure_DebstoPay} from '../interfaces/procedure_debstopay';

@Injectable({
  providedIn: 'root'
})
export class DebsToPayService {

  API_ENDPOINT = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {

   }
   save(debstopay: DebstoPay) {
    console.log(debstopay);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','accesstoken':localStorage.getItem('token') });
    return this.httpClient.post(this.API_ENDPOINT + 'DebstoPay', debstopay, { headers: headers });
  }

  saveprocedure(procedure_debstopay: Procedure_DebstoPay) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','accesstoken':localStorage.getItem('token') });
    return this.httpClient.post(this.API_ENDPOINT + 'procedure_debs', procedure_debstopay, { headers: headers });
  }
}
