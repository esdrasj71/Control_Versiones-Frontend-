import { Component, OnInit } from '@angular/core';
import {Customers} from '../../customers/interfaces/customer';
import {Products} from '../../product/interfaces/product';
import { HttpClient } from '@angular/common/http';
import {CustomersService} from '../../customers/servicios/customers.service';
import {ProductsService} from '../../product/servicios/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-header-form',
  templateUrl: './bill-header-form.component.html',
  styleUrls: ['./bill-header-form.component.css']
})
export class BillHeaderFormComponent implements OnInit {
  filtrado_clientes = '';
  clientes: any[];
  cliente: Customers[];

  //busqueda de productos 
  filtrado_productos = '';
  productos: any[];
  producto: Products[];
  constructor(private customersService:CustomersService,private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private productsService: ProductsService) { 

  }

  ngOnInit(): void {
    this.customersService.getCustomer().subscribe((data: Customers[])=>{
      return this.cliente = data;
    })

    this.productsService.getProduct().subscribe((data: Products[])=>{
      return this.producto = data;
    })
  }
  getCustomerId(id)
  {
    
    this.customersService.getCustomerId(id).subscribe((data: Customers[])=>{
       this.clientes= data;
       return this.clientes=Array.of(this.clientes);
  });

 
  }
  getProductId(id){
    this.productsService.getProductsId(id).subscribe((data: Products[])=>{
      this.productos = data;
      return this.productos = Array.of(this.productos);
    })
  
      
  }

}
