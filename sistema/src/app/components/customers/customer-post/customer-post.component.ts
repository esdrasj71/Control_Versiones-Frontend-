import { Component, OnInit } from '@angular/core';
import { Customers } from '../interfaces/customer';
import { CustomersService } from '../servicios/customers.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-customer-post',
  templateUrl: './customer-post.component.html',
  styleUrls: ['./customer-post.component.css']
})
export class CustomerPostComponent implements OnInit {

  customers: Customers = {
    DPI: null,
    Names: null,
    Last_names: null,
    Phone_Number: null,
    NIT: null,
    Address: null,
  }
  API_ENDPOINT = 'http://localhost:3000/';

  ngOnInit(): void {
  }

  constructor(private customersService: CustomersService) {

  }

  saveCustomer() {
    console.log(this.customers);
    this.customersService.saveCustomer(this.customers).subscribe((data) => {
      alert('Cliente guardada');
      console.log(data)
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    })
  }
}
