import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Reports3Service {
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }

  getReport3(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'report_sales', {headers});
  }
}
