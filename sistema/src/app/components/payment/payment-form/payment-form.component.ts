import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../servicios/payment.service';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../interfaces/payment';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  payment: Payment = {
    Payment_Id:null,
    Method_Name: null,
  }; 
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; 
  postarr: Payment[]; 
  constructor(private paymentServicie: PaymentService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; 
    if (this.id) {
      this.editing = true;
      this.paymentServicie.getPayment().subscribe((data: Payment[]) => {
        this.postarr = data;
        this.payment = this.postarr.find((m) => { return m.Payment_Id == this.id });
        console.log(this.payment);
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
      this.paymentServicie.put(this.payment).subscribe((data) => { 
        Swal.fire('Pago Actualizado', '','success');
        //console.log(data)
      }, (error) => { 
        //console.log(error);  
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
    else{
      if (this.payment.Method_Name == null) {
        Swal.fire({ icon: 'warning', title: 'Aviso!', text: 'Debe ingresar un nombre' });
      }
    else {
      console.log(this.payment);
      this.paymentServicie.save(this.payment).subscribe((data) => {
        Swal.fire('Pago Guardado', '','success');
        //console.log(data)
      }, (error) => { 
        //console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
  }
  } 
}
 