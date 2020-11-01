import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'; 
import {Report2} from '../interfaces/report2';
@Injectable({
  providedIn: 'root'
})
export class Reports2Service {
  API_ENDPOINT = 'http://localhost:3000/';
  

  constructor(private httpClient: HttpClient) {
   
   }

   savereport2(report2: Report2){
    console.log(report2);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'report_sales', report2, {headers: headers});
  }
}
