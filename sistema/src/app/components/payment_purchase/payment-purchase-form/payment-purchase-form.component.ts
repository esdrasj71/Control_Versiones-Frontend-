import { Component, OnInit } from '@angular/core';
import { PaymentPurchaseService } from '../servicios/payment-purchase.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentPurhcase } from '../interfaces/payment-purhcase';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-purchase-form',
  templateUrl: './payment-purchase-form.component.html',
  styleUrls: ['./payment-purchase-form.component.css']
})
export class PaymentPurchaseFormComponent implements OnInit {

  payment: PaymentPurhcase = {
    Payment_Purchase_Id:null,
    Method_Name: null,
  }; //este arreglo define los campos que se van a ingresar en el formulario
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; //Este campo ayuda a saber cuando estamos editando y cuando estamos ingresando
  postarr: PaymentPurhcase[]; //Este campo nos ayudara a traer los datos cuando queremos editar
  constructor(private paymentServicie: PaymentPurchaseService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.id = this.activatedRoute.snapshot.params['id']; //Este es el parametro que se definio en la ruta de app.module.ts
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'payment_purchase', { headers }).subscribe((data: PaymentPurhcase[]) => {
        this.postarr = data;
        console.log(this.postarr);
        this.payment = this.postarr.find((m) => { return m.Payment_Purchase_Id == this.id }); //Aqui traemos solo el id que nos interesa
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
  }
  ngOnInit() {
  }
  savePayment() {
    if (this.editing) {
      this.paymentServicie.put(this.payment).subscribe((data) => { //El unico cambioes el put
        Swal.fire('Pago Compra Actualizado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);  
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
    else {
      console.log(this.payment);
      this.paymentServicie.save(this.payment).subscribe((data) => {
        Swal.fire('Pago Compra Guardada', '','success');
        console.log(data)
      }, (error) => { 
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''}); 
      });
    }
  } 
}
