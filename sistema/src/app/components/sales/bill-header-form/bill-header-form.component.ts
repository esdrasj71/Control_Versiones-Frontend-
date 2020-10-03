import { Component, OnInit } from '@angular/core';
import {Customers} from '../../customers/interfaces/customer';
import {Products} from '../../product/interfaces/product';
import {Inventory} from '../../inventory/interfaces/inventory';
import {Employee} from '../../employee/interfaces/employee';
import { HttpClient } from '@angular/common/http';
import {CustomersService} from '../../customers/servicios/customers.service';
import {ProductsService} from '../../product/servicios/products.service';
import {InventoryService} from '../../inventory/servicios/inventory.service';
import {EmployeeService} from '../../employee/servicios/employee.service';
import { ActivatedRoute } from '@angular/router';
import {BillDetails} from '../interfaces/bill-detail';
import {Bill_header} from '../interfaces/bill-header';
@Component({
  selector: 'app-bill-header-form',
  templateUrl: './bill-header-form.component.html',
  styleUrls: ['./bill-header-form.component.css']
})
export class BillHeaderFormComponent implements OnInit {
  values: number = 0;
  total: number = 0;

  encabezado_factura: Bill_header = {
    Bill_header_Id: null,
    Correlative_Number: null,
    Serie: null,
    Date: null,
    Total: null,
    Refund: null,
    Annulment_State: null,
    Customers_Id: null,
    Employee_Id: null,
  }

  detalle_factura: BillDetails ={
    Bill_Detail_Id: null,
    Subtotal: null,
    Quantity: null,
    Price: null,
    Bill_header_Id: null,
    Inventory_Id: null,
  }
  changeCount: number = 0;
  nuevo = [];
  API_ENDPOINT = 'http://localhost:3000/'
  filtrado_clientes = '';
  clientes: any[];
  cliente: Customers[];

  //busqueda de productos 
  filtrado_productos = '';
  productos: any[];
  producto: Products[];
  //inventario
  inventario: Inventory[];
  inventarios: any[];

  //empleado
  empleados: Employee[];
 

  constructor(private employeeService: EmployeeService, private customersService:CustomersService,private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private productsService: ProductsService, private inventoryService: InventoryService) { 
  
  }

  ngOnInit(): void {
    this.customersService.getCustomer().subscribe((data: Customers[])=>{
      return this.cliente = data;
    })

    this.productsService.getProduct().subscribe((data: Products[])=>{
      return this.producto = data;
    })
    this.inventoryService.getInventory().subscribe((data: Inventory[])=>{
      return this.inventario = data;
    })
    this.employeeService.getEmployee().subscribe((data: Employee[])=>{
      return this.empleados = data;
    })
  
  }
  getCustomerId(id)
  {
    this.encabezado_factura.Customers_Id = id;
    this.customersService.getCustomerId(id).subscribe((data: Customers[])=>{
       this.clientes= data;//json
       return this.clientes=Array.of(this.clientes);
  });

 
  }
  getProductId(id){
    this.productsService.getProductsId(id).subscribe((data: Products[])=>{
      this.productos = data;
      return this.productos = Array.of(this.productos);
    })
  }
  getInventoryId(id){
    this.inventoryService.getInventoryId(id).subscribe((data: Inventory[])=>{
      let datos:any  = data;
      datos.Subtotal = 0;
      this.inventarios = Array.of(datos);
      this.nuevo.push(this.inventarios)
      console.log(this.nuevo)
      return this.nuevo
  })
  }
  saveBillDetail(){
    console.log(this.detalle_factura);
  }
  onEnter(value: number, precio: number, datos: any){
    console.log(datos)
    this.total -= datos[0].Subtotal;
    datos[0].Subtotal = value * precio;
    this.total += datos[0].Subtotal;  
  }
  onDelete(datos: any){
    this.total -= datos[0].Subtotal;
    this.nuevo = this.nuevo.filter((m)=>{
      return m!=datos
    })
    console.log(this.nuevo)
  }

  enviar(){
    this.encabezado_factura.Total = this.total;
    this.encabezado_factura
    let venta = {
      header:this.encabezado_factura,
      detail: this.nuevo
    }
    console.log(venta);
  }
 
}
