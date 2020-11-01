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
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'accesstoken':localStorage.getItem('token')});
    httpClient.get(this.API_ENDPOINT + 'customer',{headers})
      .subscribe((data: Customers[]) => {
        this.customer = data;
      });
   } 
   saveCustomer(customer: Customers){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
     return this.httpClient.post(this.API_ENDPOINT + 'customer', customer, {headers: headers});
   }
   getCustomer() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'customer',{headers});
  }
  getCustomerId(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'customer/' + id, {headers});
  }
  put(customer) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.put(this.API_ENDPOINT + 'customer/' + customer.Customers_Id, customer, { headers: headers }); 
  }

  delete(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.delete(this.API_ENDPOINT + 'customer/' + id,{headers:headers});
  }

}
