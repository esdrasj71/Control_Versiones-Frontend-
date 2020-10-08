import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentTypeDetail } from '../interfaces/payment-type-detail';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeDetailService {

  API_ENDPOINT = 'http://localhost:3000/';

  paymentDetail = []; 
  constructor(private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'payment_type_detail')
      .subscribe((data: PaymentTypeDetail[]) => {
        this.paymentDetail = data;
      }); 
   } 
  getPayment() {
    return this.httpClient.get(this.API_ENDPOINT + 'payment_type_detail');
  }
  save(paymentDetail: PaymentTypeDetail) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + 'payment_type_detail', paymentDetail, { headers: headers });
  }
  put(id) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.put(this.API_ENDPOINT + 'payment_type_detail/' + id.Type_Detail_Id, id, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.delete(this.API_ENDPOINT + 'payment_type_detail/' + id, { headers: headers });
  }
  findbrand(paymentDetail: PaymentTypeDetail) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(this.API_ENDPOINT + 'payment_type_detail/:Type_Detail_Id');
  }
}
