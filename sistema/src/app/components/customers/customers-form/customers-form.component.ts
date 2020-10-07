import { Component, OnInit } from '@angular/core';
import {Customers} from '../interfaces/customer';
import {CustomersService} from '../servicios/customers.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {
customer: Customers ={
  Customers_Id: null,
  DPI: null,
  Names: null,
  Last_names: null,
  Phone_Number: null,
  NIT: null,
  Direccion: null,
};
API_ENDPOINT = 'http://localhost:3000/';
id: any;
editing: boolean = false; //Este campo ayuda a saber cuando estamos editando y cuando estamos ingresando
postarr: Customers[]; 
constructor(private customerService: CustomersService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
  this.id = this.activatedRoute.snapshot.params['id']; //Este es el parametro que se definio en la ruta de app.module.ts
  if (this.id) {
    this.editing = true;
    this.httpClient.get(this.API_ENDPOINT + 'customer').subscribe((data: Customers[]) => { //Aqui traemos el arreglo completo de datos
      this.postarr = data;
      console.log(this.postarr);
      this.customer = this.postarr.find((m) => { return m.Customers_Id == this.id }); //Aqui traemos solo el id que nos interesa
    }, (error) => {
      console.log(error);
    }); 
  } else {
    this.editing = false;
  } 
}

  ngOnInit(): void {
  }
  saveCustomer() {
    if (this.editing) {
      this.customerService.put(this.customer).subscribe((data) => { //El unico cambioes el put
        alert('Cliente actualizado');
        console.log(data)
      }, (error) => {
        console.log(error);  
        alert('Ocurrio un error');
      });
    }
    else {
      console.log(this.customer);
      this.customerService.saveCustomer(this.customer).subscribe((data) => {
        alert('Cliente guardado');
        console.log(data)
      }, (error) => { 
        console.log(error);
        alert('Ocurrio un error');
      });
    }
  } 

}
