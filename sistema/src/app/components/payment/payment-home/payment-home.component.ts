import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../servicios/payment.service';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../interfaces/payment';

@Component({ 
  selector: 'app-payment-home',
  templateUrl: './payment-home.component.html',
  styleUrls: ['./payment-home.component.css']
})
export class PaymentHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  payment: Payment[];
  constructor( 
    private paymentService: PaymentService,
  ) {
    this.paymentService.getPayment()
      .subscribe((data: Payment[]) => {
        this.payment = data; 
        console.log(this.payment);
      });
  }
  ngOnInit() {}
  delete(id) {
    this.paymentService.delete(id).subscribe(
      (data) => {
        alert('Pago Eliminado');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}