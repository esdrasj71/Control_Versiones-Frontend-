import { Component, OnInit } from '@angular/core';
import { PaymentTypeDetailService } from '../servicios/payment-type-detail.service';
import { HttpClient } from '@angular/common/http';
import { PaymentTypeDetail } from '../interfaces/payment-type-detail';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../payment/interfaces/payment';
import { Bill_header } from '../../sales/interfaces/bill-header';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment-type-form',
  templateUrl: './payment-type-form.component.html',
  styleUrls: ['./payment-type-form.component.css']
})
export class PaymentTypeFormComponent implements OnInit {

  paymentDetail: PaymentTypeDetail = {
    Type_Detail_Id:null,
    Total_Amount: null,
    Description: null,
    Payment_Id: null,
    Bill_header_Id: null,
  }; 
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; 
  postarr: PaymentTypeDetail[]; 
  payment: Payment[];
  bill_header: Bill_header[];
  constructor(private paymentServicie: PaymentTypeDetailService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; 
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'payment_type_detail').subscribe((data: PaymentTypeDetail[]) => {
        this.postarr = data;
        console.log(this.postarr);
        this.paymentDetail = this.postarr.find((m) => { return m.Type_Detail_Id == this.id }); 
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }

    httpClient.get(this.API_ENDPOINT + 'payment')
    .subscribe((data: Payment[]) =>{
      this.payment = data;
    })

    httpClient.get(this.API_ENDPOINT + 'bill_header')
    .subscribe((data: Bill_header[]) =>{
      this.bill_header = data;
    })
  }

  ngOnInit() {
  }
  savePaymentDetail() {
    if (this.editing) {
      this.paymentServicie.put(this.paymentDetail).subscribe((data) => { 
        Swal.fire('Detalle tipo de pago actualizado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);  
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
    else {
      this.paymentServicie.save(this.paymentDetail).subscribe((data) => {
        Swal.fire('Detalle tipo de pago guardado', '','success');
        console.log(data)
      }, (error) => { 
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
  } 
}
 
 