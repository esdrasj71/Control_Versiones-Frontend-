import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Customers} from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  API_ENDPOINT = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {

   }
   saveCustomer(customer: Customers){
     const headers = new HttpHeaders({'Content-Type': 'application/json'});
     return this.httpClient.post(this.API_ENDPOINT + 'customer', customer, {headers: headers});
   }
   getCustomer() {
    return this.httpClient.get(this.API_ENDPOINT + 'customer');

  }
  getCustomerId(id) {
    return this.httpClient.get(this.API_ENDPOINT + 'customer/' + id);
  }
}
