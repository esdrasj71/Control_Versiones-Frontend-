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
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false;
  postarr: PaymentPurhcase[]; 
  constructor(private paymentServicie: PaymentPurchaseService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'payment_purchase', { headers }).subscribe((data: PaymentPurhcase[]) => {
        this.postarr = data;
        console.log(this.postarr);
        this.payment = this.postarr.find((m) => { return m.Payment_Purchase_Id == this.id }); 
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
