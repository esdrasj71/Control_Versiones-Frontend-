import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BillDetails} from '../interfaces/bill-detail';
import {Bill_header} from '../interfaces/bill-header';
@Injectable({
  providedIn: 'root'
})
export class BillsService {
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {

   }
   saveDetails(billdetails: BillDetails){
     const headers = new HttpHeaders({'Content-Type':'application/json'});
     return this.httpClient.post(this.API_ENDPOINT +'bill_header',billdetails,{headers: headers} );
   }
   saveHeader(billheader: Bill_header){
     const headers = new HttpHeaders({'Content-Type': 'application/json'});
     return this.httpClient.post(this.API_ENDPOINT + 'bill_header',billheader, {headers: headers});
   }
}
