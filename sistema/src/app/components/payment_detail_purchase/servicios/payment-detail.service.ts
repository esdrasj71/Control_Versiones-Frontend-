import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentDetail } from '../interfaces/payment-detail';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  API_ENDPOINT = 'http://localhost:3000/';

  paymentDetail = []; 
  constructor(private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    httpClient.get(this.API_ENDPOINT + 'payment_detail_purchase',{headers})
      .subscribe((data: PaymentDetail[]) => {
        this.paymentDetail = data;
      }); 
   } 
  getPayment() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'payment_detail_purchase',{headers});
  }
  save(paymentDetail: PaymentDetail) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'payment_detail_purchase', paymentDetail, { headers: headers });
  }
  put(id) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.put(this.API_ENDPOINT + 'payment_detail_purchase/' + id.Payment_Detail_Purchase_Id, id, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.delete(this.API_ENDPOINT + 'payment_detail_purchase/' + id, { headers: headers });
  }

}
 