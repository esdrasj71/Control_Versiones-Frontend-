import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customers } from '../../customers/interfaces/customer';
import { Products } from '../../product/interfaces/product';
import { Inventory } from '../../inventory/interfaces/inventory';
import { Employee } from '../../employee/interfaces/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';
import { BillDetails } from '../interfaces/bill-detail';
import { Bill_header } from '../interfaces/bill-header';
import { Payment_detail } from '../interfaces/payment-detail';
import { NoFactura } from '../interfaces/nofactura';
import { AccountsRecivable } from '../../accounts_receivable/interfaces/accounts-receivable';
import { BillsService } from '../servicios/bills.service';
import { ProcedureSaleService } from '../servicios/procedure-sale.service';
import { Procedure_Sale } from '../interfaces/procedure-sale';
import { PaymentDetailService } from '../servicios/payment-detail.service';
import { CustomersService } from '../../customers/servicios/customers.service';
import { ProductsService } from '../../product/servicios/products.service';
import { InventoryService } from '../../inventory/servicios/inventory.service';
import { EmployeeService } from '../../employee/servicios/employee.service';
import { AccountsReceivableService } from '../../accounts_receivable/servicios/accounts-receivable.service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-header-form',
  templateUrl: './bill-header-form.component.html',
  styleUrls: ['./bill-header-form.component.css']
})
export class BillHeaderFormComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChild('totall') totall: ElementRef;
  @ViewChild('clientess') clientess: ElementRef;
  @ViewChild('factura') factura: ElementRef;
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
    Date: null,
    Total: null,
    Payment_Complete: null,
    Customers_Id: null,
    Employee_Id: null,
    Serie_Id: null,
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
  nuevo_inventario: any[];
  arreglo = [];
  //empleado
  empleados: Employee[];

  //fecha

  date = new Date();
  mes = this.date.getMonth() + 1
  //fecha = this.date.getDate() + "/" + this.mes.toString() + "/" + this.date.getFullYear();
  fecha = this.date.getFullYear() + "/" + this.mes.toString() + "/" + this.date.getDate();

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
  empresa: any = [];

  nombre_empleado: string = "";
  idempleado: number = 0;
  idempleado1: number = 0;

  serie = {};
  nombre_serie = "";
  idserie = 0;
  cantidadfac = 0;

  constructor(
    private billsService: BillsService,
    private employeeService: EmployeeService,
    private customersService: CustomersService,
    private httpClient: HttpClient,
    private productsService: ProductsService,
    private inventoryService: InventoryService,
    private proceduresaleService: ProcedureSaleService,
    private paymentdetailService: PaymentDetailService,
    private accountsRecivableService: AccountsReceivableService,
    private router: Router,


  ) {


    this.idempleado = parseInt(localStorage.getItem('EmpleadoId'));
    this.encabezado_factura.Employee_Id = this.idempleado;
    this.employeeService.findEmployee(this.idempleado).subscribe((data: Employee[]) => {

      this.nombre_empleado = data["Names"] + " " + data["Last_names"];

    })
    try{
      this.serie = JSON.parse(localStorage.getItem("serie"));
      this.nombre_serie = this.serie["Nombre"];
      this.idserie = this.serie["serieId"];
      //this.cantidadfac = this.serie["Cantidad"];
      this.billsService.getfactura(this.idserie).subscribe((data)=>{
        //console.log(data);
        this.cantidadfac = data[0]["Cantidad_inicial"];
        
      })
      //console.log(this.cantidadfac);
    }catch{
      alert("Falta serie");
      this.router.navigate(['/serie-form']);
    }
    

  }

  ngOnInit(): void {
   
    this.customersService.getCustomer().subscribe((data: Customers[]) => {
      return this.cliente = data;
    })

    this.productsService.getProduct().subscribe((data: Products[]) => {
      return this.producto = data;
    })

    this.proceduresaleService.getempresa().subscribe((data) => {
      this.empresa = data[0];
      return this.empresa;
    });

    this.inventoryService.getInventory().subscribe((data: Inventory[]) => {
      let nuevo1: any = [];
      let prueba = [];

      let estado: boolean = false;
      data.forEach((m) => {

        if (m["Stock"] != 0) {
          nuevo1 = m;
          nuevo1["Subtotal"] = m["Stock"] * m["Unit_Price"];
          prueba.push(nuevo1);
          prueba.forEach(a => {
            estado = false;
            if (m["Product_Id"] == a["Product_Id"] && m["Inventory_Id"] != a["Inventory_Id"]) {
              a["Stock"] += m["Stock"];
              a["Subtotal"] += m["Stock"] * m["Unit_Price"];
              a["Unit_Price"] = (a["Subtotal"] / a["Stock"]).toFixed(2);
              estado = true;
            }
          })
          if (estado == true) {
            prueba.pop()

          }
          var hash = {};
          let array = prueba.filter(function (current) {
            var exists = !hash[current.Product_Id];
            hash[current.Product_Id] = true;
            return exists;
          });
          this.nuevo_inventario = array;
        }
      });

      return this.nuevo_inventario;
    });

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
  getInventoryId(id, price, stock) {
    this.inventoryService.getInventoryId(id).subscribe((data: Inventory[]) => {
      let datos: any = data;
      datos.Subtotal = 0;
      datos.Unit_Price = price;
      datos.Stock = stock;
      this.inventarios = Array.of(datos);
      this.nuevo.push(this.inventarios)
      return this.nuevo
    })
  }
  saveBillDetail() {
    //console.log(this.detalle_factura);
  }
  onEnter(value: number, precio: number, datos: any) {
    if (value > datos[0].Stock || value < 0) {
      alert("Solo hay en existencia: " + datos[0].Stock);
    } else {
      this.total -= datos[0].Subtotal;
      datos[0].Subtotal = Math.round(value * precio);
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
  }
  mostraraldebito() {
    this.pago_aldebito = !this.pago_aldebito;
  }
  mostraralcredito() {
    this.pago_alcredito = !this.pago_alcredito;
  }
  setear() {
    this.total_cobro = this.total;
  }

  enviar() {
    if (this.encabezado_factura.Correlative_Number == 0 || this.encabezado_factura.Date == "" || this.encabezado_factura.Customers_Id == null  || this.encabezado_factura.Total == 0) {
      Swal.fire({ icon: 'warning', title: 'Precaución!', text: 'Algun dato no fue ingresado' });
    } else {
      if (this.total_cobroalcontado >= this.total) {
        //pago completo
        this.encabezado_factura.Payment_Complete = true;
      } else {
        //pago incompleto
        this.encabezado_factura.Payment_Complete = false;
      }
     
      this.encabezado_factura.Total = parseFloat(this.total.toFixed(2));

      this.encabezado_factura.Date = this.fecha;
      this.encabezado_factura.Serie_Id = this.idserie;
      this.encabezado_factura.Correlative_Number =  this.cantidadfac;
      this.billsService.saveHeader(this.encabezado_factura).subscribe(
        (data) => {
        
          Swal.fire('Click para finalizar', '', 'success');
          //Swal.fire('Encabezado Guardado', '', 'success');
          window.setTimeout(function () { location.reload() }, 3000)
          if (this.encabezado_factura.Payment_Complete == false) {
            this.accounts_receivable.Quantity = 0;
            this.accounts_receivable.Total = this.total_cobro;
            this.accounts_receivable.Statuss = true;
            this.accounts_receivable.Bill_header_Id = data["id"];
            this.accountsRecivableService.saveAccountRecivable(this.accounts_receivable).subscribe((data) => {
              //Swal.fire('Cuenta por cobrar guardada', '', 'success');
            }, (error) => {
              Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: 'Cuentas por cobrar' });
            })

          }
          if (this.encabezado_factura.Payment_Complete == true) {
            if (this.total_cobroalcontado > this.total) {
              this.total_cobroalcontado = this.total;
            }
            this.pago_detalle.Total_Amount = this.total_cobroalcontado;
            this.pago_detalle.Payment_Id = 1;
            this.pago_detalle.Bill_header_Id = data["id"];
            
            this.paymentdetailService.save(this.pago_detalle).subscribe(
              (data) => {
                //Swal.fire('Pago Guardado', '', 'success');
                //console.log(data);
              },
              (error) => {
                console.log(error);
                Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
              });

          } else {
            //console.log(typeof(this.total_cobroalcontado))
            if (this.total_cobroalcontado == 0) {
              this.pago_detalle.Total_Amount = this.total_cobro;
              this.pago_detalle.Payment_Id = 2;
              this.pago_detalle.Bill_header_Id = data["id"];
              this.paymentdetailService.save(this.pago_detalle).subscribe(
                (data) => {
                 // Swal.fire('Pago Guardado', '', 'success');
                  //console.log(data);
                },
                (error) => {
                  console.log(error);
                  Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
                });
            } else {
              this.pago_detalle.Total_Amount = this.total_cobroalcontado;
              this.pago_detalle.Payment_Id = 1;
              this.pago_detalle.Bill_header_Id = data["id"];
              this.paymentdetailService.save(this.pago_detalle).subscribe(
                (data) => {
                  //Swal.fire('Pago Guardado', '', 'success');
                  //console.log(data);
                },
                (error) => {
                  console.log(error);
                  Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
                });
              this.pago_detalle.Total_Amount = this.total_cobro;
              this.pago_detalle.Payment_Id = 2;
              this.pago_detalle.Bill_header_Id = data["id"];
              this.paymentdetailService.save(this.pago_detalle).subscribe(
                (data) => {
                  //Swal.fire('Pago Guardado', '', 'success');
                  //console.log(data);
                },
                (error) => {
                  console.log(error);
                  Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
                });

            }
          }

          for (let misdatos of this.nuevo) {
            //alert("Detalle guardado");
            this.procedure_sale.Subtotal = misdatos[0].Subtotal;
            this.procedure_sale.Quantity = parseInt(misdatos[0].Quantity);
            this.procedure_sale.Price = misdatos[0].Unit_Price;
            this.procedure_sale.Inventory_Id = misdatos[0].Inventory_Id;
            
            this.proceduresaleService.save(this.procedure_sale).subscribe(
              (data) => {
                
              
                //console.log(data);
              },
              (error) => {
                console.log(error);
                Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
              }
            )
          };


        },
        (error) => {
          console.log(error);
          Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
        });
      //detalle
      
      

      //localStorage.removeItem("id");
    }
    const doc = new jsPDF();
    //get table html
    let fechita = this.fecha;
    let serita = this.nombre_serie;
    const pdfTable = this.pdfTable.nativeElement;
    const totall = this.totall.nativeElement;
    const factura = this.factura.nativeElement;
    const clientess = this.clientess.nativeElement;
    //html to pdf format
    var html = htmlToPdfmake(`
    <div style = "text-align:center;">
    <h1>
    <p>
    <b>Empresa: </b> `+ this.empresa.Company_Name + `
    </p>
    <p>
    <b>Dirección: </b> `+ this.empresa.Address + `
    </p>
    <p>
    <b>NIT: </b> `+ this.empresa.NIT + `
    </p>
    </h1>
   </div> 
  <hr>
  <h3>FACTURACION </h3>
    `+ factura.innerHTML + `
    <p>Serie: `+ serita + ` </p>
    <p>Fecha: `+ fechita + `</p></br>
    <h3>Datos del cliente</h3>
  <hr>
    `+ clientess.innerHTML + `<hr> <h3>Detalle de la factura</h3>` + totall.innerHTML + pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
}