import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentPurhcase } from '../interfaces/payment-purhcase';

@Injectable({
  providedIn: 'root'
})
export class PaymentPurchaseService {

  API_ENDPOINT = 'http://localhost:3000/';

  paymentPurchase = []; 
  constructor(private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'payment_purchase')
      .subscribe((data: PaymentPurhcase[]) => {
        this.paymentPurchase = data;
      }); 
   } 
  getPaymentPurchase() {
    return this.httpClient.get(this.API_ENDPOINT + 'payment_purchase');
  }
  save(paymentPurchase: PaymentPurhcase) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + 'payment_purchase', paymentPurchase, { headers: headers });
  }
  put(id) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.put(this.API_ENDPOINT + 'payment_purchase/' + id.Payment_Purchase_Id, id, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.delete(this.API_ENDPOINT + 'payment_purchase/' + id, { headers: headers });
  }
  findbrand(paymentPurchase: PaymentPurhcase) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(this.API_ENDPOINT + 'payment_purchase/:Payment_Purchase_Id');
  }
}
 