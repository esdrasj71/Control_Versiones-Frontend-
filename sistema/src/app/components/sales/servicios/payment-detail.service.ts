import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Payment_detail} from '../interfaces/payment-detail';
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }
  save(payment_detail: Payment_detail){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'payment_type_detail', payment_detail, {headers: headers});
  }
}
