import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Customers} from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  API_ENDPOINT = 'http://localhost:3000/';

  customer = []; 
  constructor(private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'customer')
      .subscribe((data: Customers[]) => {
        this.customer = data;
      });
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
  put(customer) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'ContentType': 'application/json' }); 
    return this.httpClient.put(this.API_ENDPOINT + 'customer/' + customer.Customers_Id, customer, { headers: headers }); 
  }

  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.delete(this.API_ENDPOINT + 'customer/' + id,{headers:headers});
  }
}
