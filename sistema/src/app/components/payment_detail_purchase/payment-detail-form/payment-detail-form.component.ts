import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../servicios/payment-detail.service';
import { HttpClient } from '@angular/common/http';
import { PaymentDetail } from '../interfaces/payment-detail';
import { ActivatedRoute } from '@angular/router';
import { PaymentPurhcase } from '../../payment_purchase/interfaces/payment-purhcase';
import { Purchase_Header } from '../../purchase/interfaces/purchase-header';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent implements OnInit {

  paymentDetail: PaymentDetail = {
    Total_Amount: null,
    Description: null,
    Method_Name: null,
    Purchase_Header_Id: null,
  }; //este arreglo define los campos que se van a ingresar en el formulario
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; //Este campo ayuda a saber cuando estamos editando y cuando estamos ingresando
  postarr: PaymentDetail[]; //Este campo nos ayudara a traer los datos cuando queremos editar
  payment: PaymentPurhcase[];
  purchase_header: Purchase_Header[];

  constructor(private paymentServicie: PaymentDetailService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; //Este es el parametro que se definio en la ruta de app.module.ts
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'payment_detail_purchase').subscribe((data: PaymentDetail[]) => { //Aqui traemos el arreglo completo de datos
        this.postarr = data;
        console.log(this.postarr);
        this.paymentDetail = this.postarr.find((m) => { return m.Payment_Detail_Purchase_Id == this.id }); //Aqui traemos solo el id que nos interesa
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }

    httpClient.get(this.API_ENDPOINT + 'payment_purchase')
    .subscribe((data: PaymentPurhcase[]) =>{
      this.payment = data;
      console.log(this.payment);
    })

    httpClient.get(this.API_ENDPOINT + 'purchase_header')
    .subscribe((data: Purchase_Header[]) =>{
      this.purchase_header = data;
      console.log(this.purchase_header);
    })
  }

  ngOnInit() {
  }
  savePaymentDetail() {
    if (this.editing) {
      this.paymentServicie.put(this.paymentDetail).subscribe((data) => { //El unico cambioes el put
        alert('Detalle de pago compra actualizado');
        console.log(data)
      }, (error) => {
        console.log(error);  
        alert('Ocurrio un error');
      });
    }
    else {
      console.log(this.paymentDetail);
      this.paymentServicie.save(this.paymentDetail).subscribe((data) => {
        alert('Detalle de pago compra guardado');
        console.log(data)
      }, (error) => { 
        console.log(error);
        alert('Ocurrio un error'); 
      });
    }
  } 
}
 