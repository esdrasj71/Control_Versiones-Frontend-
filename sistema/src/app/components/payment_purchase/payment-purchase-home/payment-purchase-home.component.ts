import { Component, OnInit } from '@angular/core';
import { PaymentPurchaseService } from '../servicios/payment-purchase.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentPurhcase } from '../interfaces/payment-purhcase';

@Component({
  selector: 'app-payment-purchase-home',
  templateUrl: './payment-purchase-home.component.html',
  styleUrls: ['./payment-purchase-home.component.css']
})
export class PaymentPurchaseHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  paymentPurchase: PaymentPurhcase[];
  constructor( private paymentService: PaymentPurchaseService,private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'payment_purchase', { headers })
      .subscribe((data: PaymentPurhcase[]) => {
        this.paymentPurchase = data; 
        console.log(this.paymentPurchase);
      });
  }
  ngOnInit() {}
  delete(id) {
    this.paymentService.delete(id).subscribe(
      (data) => {
        alert('Pago de compra eliminado');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
 