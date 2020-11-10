import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../servicios/payment-detail.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentDetail } from '../interfaces/payment-detail';
import { ActivatedRoute } from '@angular/router';
import { PaymentPurhcase } from '../../payment_purchase/interfaces/payment-purhcase';
import { Purchase_Header } from '../../purchase/interfaces/purchase-header';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent implements OnInit {

  paymentDetail: PaymentDetail = {
    Method_Name:null,
    Total_Amount: null,
    Description: null,
    Purchase_Header_Id: null,
  }; 
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; 
  postarr: PaymentDetail[]; 
  payment: PaymentPurhcase[];
  purchase_header: Purchase_Header[];

  constructor(private paymentServicie: PaymentDetailService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.id = this.activatedRoute.snapshot.params['id']; 
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'payment_detail_purchase', { headers }).subscribe((data: PaymentDetail[]) => {
        this.postarr = data;
        console.log(this.postarr);
        this.paymentDetail = this.postarr.find((m) => { return m.Payment_Detail_Purchase_Id == this.id }); 
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }

    httpClient.get(this.API_ENDPOINT + 'payment_purchase')
    .subscribe((data: PaymentPurhcase[]) =>{
      this.payment = data;
    })

    httpClient.get(this.API_ENDPOINT + 'purchase_header')
    .subscribe((data: Purchase_Header[]) =>{
      this.purchase_header = data;
    })
  }

  ngOnInit() {
  }
  savePaymentDetail() {
    if (this.editing) {
      this.paymentServicie.put(this.paymentDetail).subscribe((data) => { //El unico cambioes el put
        Swal.fire('Detalle de pago compra actualizado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);  
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
    else {
      this.paymentServicie.save(this.paymentDetail).subscribe((data) => {
        Swal.fire('Detalle de pago compra guardado', '','success');
        console.log(data)
      }, (error) => { 
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''}); 
      });
    }
  } 
}
 