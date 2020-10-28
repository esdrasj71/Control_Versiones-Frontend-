import { Component, Input, OnInit } from '@angular/core';
import { Customers } from '../../customers/interfaces/customer';
import { Products } from '../../product/interfaces/product';
import { Inventory } from '../../inventory/interfaces/inventory';
import { Employee } from '../../employee/interfaces/employee';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';
import {BillDetails} from '../interfaces/bill-detail';
import {Bill_header} from '../interfaces/bill-header';
import {Payment_detail} from '../interfaces/payment-detail';
import {NoFactura} from '../interfaces/nofactura';
import {AccountsRecivable} from '../../accounts_receivable/interfaces/accounts-receivable';

import {BillsService} from '../servicios/bills.service';
import {ProcedureSaleService} from '../servicios/procedure-sale.service';
import {Procedure_Sale} from '../interfaces/procedure-sale';
import {PaymentDetailService} from '../servicios/payment-detail.service';
import { CustomersService } from '../../customers/servicios/customers.service';
import { ProductsService } from '../../product/servicios/products.service';
import { InventoryService } from '../../inventory/servicios/inventory.service';
import { EmployeeService } from '../../employee/servicios/employee.service';
import {AccountsReceivableService} from '../../accounts_receivable/servicios/accounts-receivable.service';

@Component({
  selector: 'app-bill-header-form',
  templateUrl: './bill-header-form.component.html',
  styleUrls: ['./bill-header-form.component.css']
})
export class BillHeaderFormComponent implements OnInit {

  values: number = 0;
  total: number = 0;
  //insertar cuentas por cobrar
  accounts_receivable: AccountsRecivable = {
    
    Quantity: null,
    Total: null,
    Statuss: null,
    Bill_header_Id: null,
  }

  pago_detalle: Payment_detail = {
    Total_Amount: null,
    Description: null,
    Payment_Id: null,
    Bill_header_Id: null,
  }
  encabezado_factura: Bill_header = {
    Correlative_Number: null,
    Serie: null,
    Date: null,
    Total: null,
    Refund: null,
    Annulment_State: null,
    Payment_Complete: null,
    Customers_Id: null,
    Employee_Id: null,
  };
  procedure_sale: Procedure_Sale = {
    Subtotal: null,
    Quantity: null,
    Price: null,
    Inventory_Id: null,
  }

  detalle_factura: BillDetails = {
    Subtotal: null,
    Quantity: null,
    Price: null,
    Bill_header_Id: null,
    Inventory_Id: null,
  }
  changeCount: number = 0;
  nuevo = [];
  vista_detail = [];
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
 nuevo_inventario: any [];
 arreglo = [];
  //empleado
  empleados: Employee[];

  //fecha

  date = new Date();
  mes = this.date.getMonth() + 1
  //fecha = this.date.getDate() + "/" + this.mes.toString() + "/" + this.date.getFullYear();
  fecha = this.date.getFullYear()  + "/" + this.mes.toString() + "/" + this.date.getDate();
  
  //formas de pago
  pago_aldebito: boolean = false;
  pago_alcredito: boolean = false;
  total_cobroalcredito: number = 0;
  total_cobroalcontado: number = 0;
  total_cobro: number = 0;
  cadena_pago: string = "Total:";
  encabezadoid: number = 0; 
  //No factura
  nofacturas: NoFactura[];
  nofactura: number = 0;

  constructor(
    private billsService: BillsService,
    private employeeService: EmployeeService,
    private customersService: CustomersService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private productsService: ProductsService,
    private inventoryService: InventoryService,
    private proceduresaleService: ProcedureSaleService,
    private paymentdetailService: PaymentDetailService,
    private accountsRecivableService: AccountsReceivableService,

    ) { 
    httpClient.get(this.API_ENDPOINT + 'nofactura')
    .subscribe((data: NoFactura[])=>{
      if(data[0].NoFactura == null){
        this.nofacturas = [{"NoFactura": 1}];
        this.encabezado_factura.Correlative_Number =  "1";
        
      }else{
        this.nofacturas = data;
        this.encabezado_factura.Correlative_Number =  data[0].NoFactura.toString();
      }
    
    }) 

  }

  ngOnInit(): void {

    this.customersService.getCustomer().subscribe((data: Customers[]) => {
      return this.cliente = data;
    })

    this.productsService.getProduct().subscribe((data: Products[]) => {
      return this.producto = data;
    })

    this.inventoryService.getInventory().subscribe((data: Inventory[])=>{
    
     
      
      let nuevo1: any = [];
      let prueba = [];
      
      let estado: boolean = false;
      data.forEach((m)=>{
      
      if(m["Stock"] != 0){
        nuevo1 = m;
        nuevo1["Subtotal"] = m["Stock"] * m["Unit_Price"];    
          prueba.push(nuevo1);
          prueba.forEach(a=>{
            estado = false;
            if(m["Product_Id"] == a["Product_Id"] && m["Inventory_Id"] != a["Inventory_Id"] ){
              a["Stock"] += m["Stock"];
              a["Subtotal"] += m["Stock"] * m["Unit_Price"]; 
              a["Unit_Price"] = (a["Subtotal"] / a["Stock"]).toFixed(2);
              estado = true;
             // console.log("entro");
            }
          })
          if(estado == true){
            prueba.pop()
            
          }
          var hash = {};
          let array = prueba.filter(function(current){
            var exists = !hash[current.Product_Id];
            hash[current.Product_Id] = true;
            return exists;
          });
          this.nuevo_inventario = array;
          console.log(this.nuevo_inventario);
      }
      });

      return this.nuevo_inventario;
      }) ;
  
    this.employeeService.getEmployee().subscribe((data: Employee[]) => {
      console.log(data);
      return this.empleados = data;
    
    })



  }
  getCustomerId(id) {
    this.encabezado_factura.Customers_Id = id;
    this.customersService.getCustomerId(id).subscribe((data: Customers[]) => {
      this.clientes = data;//json
      return this.clientes = Array.of(this.clientes);
    });


  }
  getProductId(id) {
    this.productsService.getProductsId(id).subscribe((data: Products[]) => {
      this.productos = data;
      return this.productos = Array.of(this.productos);
    })
  }
  getInventoryId(id, price, stock) {
    this.inventoryService.getInventoryId(id).subscribe((data: Inventory[]) => {
      let datos: any = data;
      datos.Subtotal = 0;
      datos.Unit_Price = price;
      datos.Stock = stock;
      this.inventarios = Array.of(datos);
      this.nuevo.push(this.inventarios)
      console.log(this.nuevo)
      return this.nuevo
    })
  }
  saveBillDetail() {
    console.log(this.detalle_factura);
  }
  onEnter(value: number, precio: number, datos: any) {
    if(value >= datos[0].Stock || value <= 0){
      alert("Solo hay en existencia: "+ datos[0].Stock);
    }else{
      console.log(datos)
      this.total -= datos[0].Subtotal;
      datos[0].Subtotal = Math.round( value * precio);
      datos[0].Quantity = value;
      this.total += datos[0].Subtotal;
      this.total_cobro = this.total;
    }

  }
  onPagoalcontado(value: number) {
    this.total_cobroalcontado = value;
    this.total_cobro -= this.total_cobroalcontado;

    if (this.total_cobro < 0) {
      this.total_cobro = Math.abs(this.total_cobro)
      this.cadena_pago = "El vuelto es de: ";
      //alert(this.cadena_pago);
    }

  }
  onPagoalcredito(value: number) {
    this.total_cobroalcredito = value;
    this.total_cobro -= this.total_cobroalcredito;

  }
  onDelete(datos: any) {
    this.total_cobro -= datos[0].Subtotal;
    this.total -= datos[0].Subtotal;
    this.nuevo = this.nuevo.filter((m) => {
      return m != datos
    })
    console.log(this.nuevo)
  }
  mostraraldebito() {
    this.pago_aldebito = !this.pago_aldebito;
  }
  mostraralcredito() {
    this.pago_alcredito = !this.pago_alcredito;
    console.log(this.pago_alcredito);
  }
  setear(){
    this.total_cobro = this.total;
  }

  enviar() {
if(this.encabezado_factura.Correlative_Number == " " || this.encabezado_factura.Serie == null || this.encabezado_factura.Date == "" || this.encabezado_factura.Customers_Id == null || this.encabezado_factura.Employee_Id == NaN || this.encabezado_factura.Total == 0){
  alert("Precaucion!!!!!!, algun dato no fue ingresado ");    
}else{
  console.log(this.total_cobroalcontado);
    if(this.total_cobroalcontado >= this.total){
      //pago completo
      this.encabezado_factura.Payment_Complete = true;
    }else{
      //pago incompleto
        this.encabezado_factura.Payment_Complete = false;
    }
    
    this.encabezado_factura.Refund = 0;
    this.encabezado_factura.Annulment_State = 0;
    this.encabezado_factura.Total = parseFloat(this.total.toFixed(2));

    console.log(this.fecha);
    this.encabezado_factura.Date = this.fecha; 

    this.billsService.saveHeader(this.encabezado_factura).subscribe(
      (data) => {
        alert('header guardado');
        if(this.encabezado_factura.Payment_Complete == false){
          this.accounts_receivable.Quantity =  0;
          this.accounts_receivable.Total = this.total_cobro;
          this.accounts_receivable.Statuss = true;
          this.accounts_receivable.Bill_header_Id =  data["id"];
          this.accountsRecivableService.saveAccountRecivable(this.accounts_receivable).subscribe((data)=>{
            alert('Cuenta por cobrar guardada');
          }, (error)=>{
            alert("cuentas por cobrar Error");
          })
     
        }
        if (this.encabezado_factura.Payment_Complete == true) {
          if(this.total_cobroalcontado > this.total){
            this.total_cobroalcontado = this.total;      
          }
          this.pago_detalle.Total_Amount = this.total_cobroalcontado;
          this.pago_detalle.Payment_Id = 1;
          this.pago_detalle.Bill_header_Id = data["id"];
          this.paymentdetailService.save(this.pago_detalle).subscribe(
            (data) => {
              alert('Pago guardado');
              console.log(data);
            },
            (error) => {
              console.log(error);
              alert('Ocurrio un error');
            });

        }else{
          //console.log(typeof(this.total_cobroalcontado))
          if (this.total_cobroalcontado == 0) {
            this.pago_detalle.Total_Amount = this.total_cobro;
            this.pago_detalle.Payment_Id = 2;
            this.pago_detalle.Bill_header_Id = data["id"];
            this.paymentdetailService.save(this.pago_detalle).subscribe(
              (data) => {
                alert('Pago guardado');
                console.log(data);
              },
              (error) => {
                console.log(error);
                alert('Ocurrio un error');
              });
          }else{
            this.pago_detalle.Total_Amount = this.total_cobroalcontado;
            this.pago_detalle.Payment_Id = 1;
            this.pago_detalle.Bill_header_Id = data["id"];
            this.paymentdetailService.save(this.pago_detalle).subscribe(
              (data) => {
                alert('Pago guardado');
                console.log(data);
              },
              (error) => {
                console.log(error);
                alert('Ocurrio un error');
              });
              this.pago_detalle.Total_Amount = this.total_cobro;
              this.pago_detalle.Payment_Id = 2;
              this.pago_detalle.Bill_header_Id = data["id"];
              this.paymentdetailService.save(this.pago_detalle).subscribe(
                (data) => {
                  alert('Pago guardado');
                  console.log(data);
                },
                (error) => {
                  console.log(error);
                  alert('Ocurrio un error');
                });

          }
        }
      
      },
      (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    //detalle
    for (let misdatos of this.nuevo) {
      this.procedure_sale.Subtotal = misdatos[0].Subtotal;
      this.procedure_sale.Quantity = parseInt(misdatos[0].Quantity);
      this.procedure_sale.Price = misdatos[0].Unit_Price;
      this.procedure_sale.Inventory_Id = misdatos[0].Inventory_Id;
      console.log(this.procedure_sale);
      this.proceduresaleService.save(this.procedure_sale).subscribe(
        (data) => {
          alert('producto guardado');
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert('Ocurrio un error');
        }
      )
    };

    //localStorage.removeItem("id");
  }
  
}
}