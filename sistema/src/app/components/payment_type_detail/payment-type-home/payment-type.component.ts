import { Component, OnInit } from '@angular/core';
import { PaymentTypeDetailService } from '../servicios/payment-type-detail.service';
import { HttpClient } from '@angular/common/http';
import { PaymentTypeDetail } from '../interfaces/payment-type-detail';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.css']
})
export class PaymentTypeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  paymentType: PaymentTypeDetail[];
  constructor( 
    private paymentService: PaymentTypeDetailService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    httpClient
      .get(this.API_ENDPOINT + 'payment_type_detail')
      .subscribe((data: PaymentTypeDetail[]) => {
        this.paymentType = data; 
      });
  }
  ngOnInit() {}
  delete(id) {
    this.paymentService.delete(id).subscribe(
      (data) => {
        alert('Detalle tipo de pago Eliminado');
        this.router.navigateByUrl('/home');
        this.router.navigate(["/payment-type-home"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
 