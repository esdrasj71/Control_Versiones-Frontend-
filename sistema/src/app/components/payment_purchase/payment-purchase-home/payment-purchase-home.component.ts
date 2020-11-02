import { Component, OnInit } from '@angular/core';
import { PaymentPurchaseService } from '../servicios/payment-purchase.service';
import { HttpClient } from '@angular/common/http';
import { PaymentPurhcase } from '../interfaces/payment-purhcase';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment-purchase-home',
  templateUrl: './payment-purchase-home.component.html',
  styleUrls: ['./payment-purchase-home.component.css']
})
export class PaymentPurchaseHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  paymentPurchase: PaymentPurhcase[];
  constructor( 
    private paymentService: PaymentPurchaseService,
    private httpClient: HttpClient
  ) {
    httpClient
      .get(this.API_ENDPOINT + 'payment_purchase')
      .subscribe((data: PaymentPurhcase[]) => {
        this.paymentPurchase = data; 
        console.log(this.paymentPurchase);
      });
  }
  ngOnInit() {}
  delete(id) {
    this.paymentService.delete(id).subscribe(
      (data) => {
        Swal.fire('Pago Compra Eliminado', '','success');
        window.setTimeout(function(){location.reload()},2000)
      },
      (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      }
    );
  }
}
 