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
    Payment_Purchase_Id:null,
    Method_Name: null,
  }; //este arreglo define los campos que se van a ingresar en el formulario
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; //Este campo ayuda a saber cuando estamos editando y cuando estamos ingresando
  postarr: Payment[]; //Este campo nos ayudara a traer los datos cuando queremos editar
  constructor(private paymentServicie: PaymentService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; //Este es el parametro que se definio en la ruta de app.module.ts
    if (this.id) {
      this.editing = true;
      this.paymentServicie.getPayment().subscribe((data: Payment[]) => { //Aqui traemos el arreglo completo de datos
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
        Swal.fire('Pago Actualizado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);  
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
    else {
      console.log(this.payment);
      this.paymentServicie.save(this.payment).subscribe((data) => {
        Swal.fire('Pago Guardado', '','success');
        console.log(data)
      }, (error) => { 
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
  } 
}
 