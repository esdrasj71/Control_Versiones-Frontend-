import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../servicios/payment-detail.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentDetail } from '../interfaces/payment-detail';


@Component({
  selector: 'app-payment-detail-home',
  templateUrl: './payment-detail-home.component.html',
  styleUrls: ['./payment-detail-home.component.css']
})
export class PaymentDetailHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  paymentDetail: PaymentDetail[];
  constructor( private paymentService: PaymentDetailService,private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'payment_detail_purchase', { headers })
      .subscribe((data: PaymentDetail[]) => {
        this.paymentDetail = data; 
        console.log(this.paymentDetail);
      });
  }
  ngOnInit() {}
  delete(id) {
    this.paymentService.delete(id).subscribe(
      (data) => {
        alert('Detalle de pago compra Eliminado');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
}
}
  