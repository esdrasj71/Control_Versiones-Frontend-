import { Component, OnInit } from '@angular/core';
import {Customers} from '../interfaces/customer';
import {CustomersService} from '../servicios/customers.service';
@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {
customer: Customers ={
  DPI: null,
  Names: null,
  Last_names: null,
  Phone_Number: null,
  NIT: null,
  Direccion: null,
}
  constructor(private customersService: CustomersService) {

   }

  ngOnInit(): void {
  }
  saveCustomer(){
   this.customersService.saveCustomer(this.customer).subscribe((data)=>{
     alert('Cliente Guardado');
     console.log(data);
   }, (error)=>{
      console.log(error);
     alert('Ocurrio un error');
     
   });
  }

}
