import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Company} from '../interface/company'
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  API_ENDPOINT = 'http://localhost:3000/';
  company:Company[];
  constructor(private httpClient:HttpClient) { }

  getCompany() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'company', {headers});

  }
  save(company:Company) {
    console.log(company);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'company', company, { headers: headers });
  }
  put(company) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') }); //Esto se declara cuando hay una ruta que no sea get
    return this.httpClient.put(this.API_ENDPOINT + 'company/'+company.Company_Id, company, { headers: headers });
  }
}
