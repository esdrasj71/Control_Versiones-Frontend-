import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Providers } from '../../providers/interfaces/providers';
import { ProvidersService } from '../../providers/servicios/providers.service';
import { Inventory } from '../../inventory/interfaces/inventory';
import { InventoryService } from '../../inventory/servicios/inventory.service';
import { Purchase_Detail } from '../interfaces/purchase-detail';
import { Purchase_Header } from '../interfaces/purchase-header';
import { PurchaseHeaderService } from '../servicios/purchase-header.service';
import { ProcedurePurchaseService } from '../servicios/procedure-purchase.service';
import { Procedure_Purchase } from '../interfaces/procedure-purchase';
import { Products } from '../../product/interfaces/product';
import { ProductsService } from '../../product/servicios/products.service';
import { Lot } from '../../lot/interfaces/lot';
import { LotService } from '../../lot/servicios/lot.service';
import { PaymentDetail } from '../../payment_detail_purchase/interfaces/payment-detail';
import { PaymentDetailService } from '../../payment_detail_purchase/servicios/payment-detail.service';
import { DebstoPay } from '../../debs_to_pay/interfaces/debs-to-pay';
import { DebsToPayService } from '../../debs_to_pay/servicios/debs-to-pay.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-purchase-header-form',
  templateUrl: './purchase-header-form.component.html',
  styleUrls: ['./purchase-header-form.component.css'],
})
export class PurchaseHeaderFormComponent implements OnInit {
  //PETICION
  API_ENDPOINT = 'http://localhost:3000/';
  //ENUMERADOS DE TABLAS
  paginaActual: number = 1;
  paginaActualp: number = 1;
  //USO DE FILTRADO DE TEXTO
  filtrado_proveedor = '';
  filtrado_product = '';
  //LOGICA PARA ASIGNAR EN DETALLE, INVENTARIO, PRODUCTO Y PROOVEDOR
  proveedor_seleccionado: any[''];
  vista_detail = [];
  inventory: Inventory[];
  product: Products[];
  providers: Providers[];
  inventorys: any[];
  //POR SI SE NECESITA EDITAR
  editing: boolean = false;

  // GUARDAR LA CANTIDAD,EL PRECIO POR SEPARADO DENTRO DEL DETALLE DE LA COMPRA Y TOTAL PARA EL ENCABEZADO
  cantidad = [];
  precio = [];
  total: number = 0;
  //GUARDAR METODO DE PAGO
  forma1: boolean = false;
  forma2: boolean = false;
  forma3: boolean = false;
  pago_alcontado: boolean = false;
  pago_alcredito: boolean = false;
  total_cobroalcredito: number = 0;
  total_cobroalcontado: number = 0;
  total_cobro: number = 0;
  // INICIALIZAMOS LAS VARIABLES DE LAS INTERFACES A UTILIZAR PARA LLENAR DATOS
  payment: PaymentDetail = {
    Method_Name: 0,
    Total_Amount: null,
    Description: null,
    Purchase_Header_Id: null,
  };
  header: Purchase_Header = {
    Correlative_Number: null,
    Serie: null,
    Date_Purchase: null,
    Total: null,
    Payment_Complete: 0,
    Observations: null,
    Providers_Id: null,
  };
  purchase: Procedure_Purchase = {
    Quantity: null,
    Unit_Price: null,
    Subtotal: null,
    Inventory_Id: null,
  };
  detail: Purchase_Detail = {
    Quantity: null,
    Unit_Price: null,
    Subtotal: null,
    Purchase_Header_Id: null,
    Inventory_Id: null,
  };
  provider: Providers = {
    Providers_Id: null,
    NIT: null,
    Fiscal_Name: null,
    Phone_Number1: null,
    Phone_Number2: null,
    Email: null,
    Address: null,
  };
  //DebstoPay
  debstopay: DebstoPay = {
    Quantity: null,
    Total: null,
    Statuss: null,
    Description: null,
    Purchase_Header_Id: null,
  };
  producto: Observable<any>
  constructor(
    private router: Router,
    private inventoryService: InventoryService,
    private providerService: ProvidersService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private purchase_headerservice: PurchaseHeaderService,
    private procedure_purchaseservice: ProcedurePurchaseService,
    private productService: ProductsService,
    private payment_detail_purchase: PaymentDetailService,
    private lotService: LotService,
    private debstopayService: DebsToPayService,
  ) { }
  ngOnInit() {
    //let timer = TimerObservable.create(0, 5000);
   // this.product = timer.subscribe(t => {
    //    this.lotService.getLot()
    //});
    //
    this.providerService.getProviders().subscribe((data: Providers[]) => {
    this.providers = data;
    });
    this.inventoryService.getInventoryNoPerishable().subscribe((data: Inventory[]) => {
      this.inventory = data;
    });
  }
  getProviderId(id) {
    this.providerService.getProviders().subscribe((data: Providers[]) => {
      this.providers = data;
    });
    this.providerService.getProvidersId(id).subscribe((data: Providers[]) => {
      this.proveedor_seleccionado = data;
      return (this.proveedor_seleccionado = Array.of(
        this.proveedor_seleccionado
      ));
    });
  }
  lot;
  getLotId(id) {
    this.inventoryService.getInventoryNoPerishable().subscribe((data: Inventory[]) => {
      this.inventory = data;
    });
    this.lotService.findPresentation(id).subscribe((data: Lot[]) => {
      let datos: any = data;
      datos.Subtotal = 0;
      datos.Quantity = 0;
      datos.Price = 0;
      this.inventorys = Array.of(datos);
      this.vista_detail.push(this.inventorys);
    });
  }

  getProductId(id) {
    this.inventoryService.getInventoryNoPerishable().subscribe((data: Inventory[]) => {
      this.inventory = data;
    });
    this.productService.getProductsId(id).subscribe((data: Products[]) => {
      let datos: any = data;
      datos.Subtotal = 0;
      datos.Quantity = 0;
      datos.Price = 0;
      //datos.Inventory_Id=idd;
      this.inventorys = Array.of(datos);
      this.vista_detail.push(this.inventorys);
      return this.vista_detail;
    });
  }

  savePost() {
    //HEADER
    this.header.Providers_Id = this.proveedor_seleccionado[0].Providers_Id;
    this.header.Payment_Complete = 0;
    this.header.Total = this.total;
    this.purchase_headerservice.save(this.header).subscribe(
      (data) => {
        Swal.fire('Compra Guardada', '', 'success');
        //console.log(data);
        this.router.navigate(['/home']);
        this.payment.Purchase_Header_Id = data['id'];
        if (this.SiPago == true) {
          ///DebsToPay
          this.debstopay.Description = ' ';
          this.debstopay.Quantity = 0;
          this.debstopay.Total = this.total_cobro;
          this.debstopay.Statuss = true;
          this.debstopay.Purchase_Header_Id = data['id'];
          if (this.total_cobro > 0) {
            this.debstopayService.save(this.debstopay).subscribe(
              (data) => {
                Swal.fire('cuenta por pagar guardada', '', 'success');
              },
              (error) => {
                Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: 'Cuenta por pagar' });
              }
            );
             ///
             this.payment.Method_Name = 1; //al credito
             this.payment_detail_purchase.save(this.payment).subscribe(
               (data) => {
                 //console.log(data);
               },
               (error) => {
                 console.log(error);
                 Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
               }
             );
             this.payment.Method_Name = 0; // al contado
             this.payment.Total_Amount = this.total_cobroalcontado;
             this.payment_detail_purchase.save(this.payment).subscribe(
               (data) => {
                 //console.log(data);
                 Swal.fire('El metodo de pago se ha registrado correctamente', '', 'success');
               },
               (error) => {
                 console.log(error);
                 Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
               }
             );
          } 
          else{
            this.payment.Method_Name = 0; // al contado
            this.payment.Total_Amount = this.total_cobroalcontado;
            this.payment_detail_purchase.save(this.payment).subscribe(
              (data) => {
                //console.log(data);
                Swal.fire('El metodo de pago se ha registrado correctamente', '', 'success');
              },
              (error) => {
                console.log(error);
                Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
              }
            );
          }
        } 
        else {
          this.payment.Method_Name = 1; // al contado todooo
          this.payment.Total_Amount = this.total;
          ///DebsToPay
          this.debstopay.Description = ' ';
          this.debstopay.Quantity = 0;
          this.debstopay.Total = this.total_cobro;
          this.debstopay.Statuss = true;
          this.debstopay.Purchase_Header_Id = data['id'];
          if (this.total_cobro > 0) {
            this.debstopayService.save(this.debstopay).subscribe(
              (data) => {
                Swal.fire('cuenta por pagar guardada', '', 'success');
              },
              (error) => {
                Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: 'Cuenta por pagar' });
              }
            );
          }
          ///
          this.payment_detail_purchase.save(this.payment).subscribe(
            (data) => {
              Swal.fire('El metodo de pago al contado se ha registrado correctamente', '', 'success');
              //console.log(data);
            },
            (error) => {
              //console.log(error);
              Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
            }
          );
        } //
      },
      (error) => {
        //console.log(error);
        Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
      }
    );

    //DETAIL
    for (let misdatos of this.vista_detail) {
      this.purchase.Quantity = misdatos[0].Quantity;
      this.purchase.Unit_Price = misdatos[0].Price;
      this.purchase.Subtotal = misdatos[0].Subtotal;
      this.purchase.Inventory_Id = misdatos[0].Lot_Id;

      //console.log(this.purchase);
      this.procedure_purchaseservice.save(this.purchase).subscribe(
        (data) => {
          //alert('procedimiento almacenado guardado');
          //console.log(data);
        },
        (error) => {
          //console.log(error);
          Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
        }
      );
    }
    //window.location.reload();
  }

  onEnter(cantidad, precio, datos: any) {
    if (typeof cantidad == 'undefined' || typeof precio == 'undefined') {
      return (this.total = 0);
    }
    this.total -= datos[0].Subtotal;
    datos[0].Quantity = cantidad;
    datos[0].Price = precio;
    datos[0].Subtotal = cantidad * precio;
    this.total += datos[0].Subtotal;
    this.total_cobro = this.total;
  }
  EliminarDetalle(index, datos: any) {
    this.total -= datos[0].Subtotal;
    this.vista_detail.splice(index, 1);
    this.total_cobro = this.total;
  }

  cerrarpago() {
    this.header.Payment_Complete = 0;
    this.pago_alcontado = false;
    this.pago_alcredito = false;
    return (this.total_cobro = this.total);
  }
  SiPago: boolean = false;
  onPagoalcontado(value: number) {
    this.total_cobroalcontado = value;
    if (this.total_cobro >= this.total_cobroalcontado) {
      this.total_cobro -= this.total_cobroalcontado;
      this.payment.Total_Amount = this.total_cobro;
      this.SiPago = true;
    } else
      Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: 'El pago al contado supera el monto total de lo que se esta comprando' });
  }
}
