import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../servicios/payment.service';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../interfaces/payment';
import Swal from 'sweetalert2';

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
      });
  }
  ngOnInit() {}
  delete(id) {
    this.paymentService.delete(id).subscribe(
      (data) => {
        Swal.fire('Pago Eliminado', '','success');
      },
      (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      }
    );
  }

}