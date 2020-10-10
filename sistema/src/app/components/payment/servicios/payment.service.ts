import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  API_ENDPOINT = 'http://localhost:3000/';

  payment = []; 
  constructor(private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'payment')
      .subscribe((data: Payment[]) => {
        this.payment = data;
      }); 
   } 
  getPayment() {
    return this.httpClient.get(this.API_ENDPOINT + 'payment');
  }
  save(payment: Payment) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + 'payment', payment, { headers: headers });
  }
  put(id) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.put(this.API_ENDPOINT + 'payment/' + id.Payment_Id, id, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.delete(this.API_ENDPOINT + 'payment/' + id, { headers: headers });
  }
  findbrand(payment: Payment) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(this.API_ENDPOINT + 'payment/:Payment_Id');
  }
}
 