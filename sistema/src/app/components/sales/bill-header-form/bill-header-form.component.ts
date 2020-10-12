import { Component, Input, OnInit } from '@angular/core';
import { Customers } from '../../customers/interfaces/customer';
import { Products } from '../../product/interfaces/product';
import { Inventory } from '../../inventory/interfaces/inventory';
import { Employee } from '../../employee/interfaces/employee';
import { HttpClient } from '@angular/common/http';
import { CustomersService } from '../../customers/servicios/customers.service';
import { ProductsService } from '../../product/servicios/products.service';
import { InventoryService } from '../../inventory/servicios/inventory.service';
import { EmployeeService } from '../../employee/servicios/employee.service';
import { ActivatedRoute, Data } from '@angular/router';
import { BillDetails } from '../interfaces/bill-detail';
import { Bill_header } from '../interfaces/bill-header';
import { Payment_detail } from '../interfaces/payment-detail';
import { BillsService } from '../servicios/bills.service';
import { ProcedureSaleService } from '../servicios/procedure-sale.service';
import { Procedure_Sale } from '../interfaces/procedure-sale';
import { PaymentDetailService } from '../servicios/payment-detail.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-bill-header-form',
  templateUrl: './bill-header-form.component.html',
  styleUrls: ['./bill-header-form.component.css']
})
export class BillHeaderFormComponent implements OnInit {

  values: number = 0;
  total: number = 0;
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

  //empleado
  empleados: Employee[];

  //fecha

  date = new Date();
  mes = this.date.getMonth() + 1
  fecha = this.date.getDate() + "/" + this.mes.toString() + "/" + this.date.getFullYear();
  //formas de pago
  pago_aldebito: boolean = false;
  pago_alcredito: boolean = false;
  total_cobroalcredito: number = 0;
  total_cobroalcontado: number = 0;
  total_cobro: number = 0;
  cadena_pago: string = "total";
  descripcion_pagoalcontado: string = "";
  descripcion_pagoalcredito: string = "";
  encabezadoid: number = 0;
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
  ) {


  }

  ngOnInit(): void {
    this.customersService.getCustomer().subscribe((data: Customers[]) => {
      return this.cliente = data;
    })

    this.productsService.getProduct().subscribe((data: Products[]) => {
      return this.producto = data;
    })
    this.inventoryService.getInventory().subscribe((data: Inventory[]) => {
      return this.inventario = data;
    })
    this.employeeService.getEmployee().subscribe((data: Employee[]) => {
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
  getInventoryId(id) {
    this.inventoryService.getInventoryId(id).subscribe((data: Inventory[]) => {
      let datos: any = data;
      datos.Subtotal = 0;
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
    console.log(datos)
    this.total -= datos[0].Subtotal;
    datos[0].Subtotal = value * precio;
    datos[0].Quantity = value;
    this.total += datos[0].Subtotal;
    this.total_cobro = this.total;
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
  }


  enviar() {
    this.encabezado_factura.Payment_Complete = 0;
    this.encabezado_factura.Refund = 0;
    this.encabezado_factura.Annulment_State = 0;
    this.encabezado_factura.Total = this.total;
    console.log(this.encabezado_factura.Employee_Id);
    this.encabezado_factura.Date = this.fecha;

    this.billsService.saveHeader(this.encabezado_factura).subscribe(
      (data) => {
        alert('header guardado');
        // localStorage.setItem("id",data["id"]);
        if (this.pago_aldebito) {
          this.pago_detalle.Total_Amount = this.total_cobroalcontado;
          this.pago_detalle.Description = this.descripcion_pagoalcontado;
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

        }
        if (this.pago_alcredito) {
          this.pago_detalle.Total_Amount = this.total_cobroalcredito;
          this.pago_detalle.Description = this.descripcion_pagoalcredito;
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
