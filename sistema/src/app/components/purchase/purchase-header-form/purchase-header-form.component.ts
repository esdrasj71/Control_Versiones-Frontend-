import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Providers } from '../../providers/interfaces/providers';
import { ProvidersService } from '../../providers/servicios/providers.service';
import { Inventory } from '../../inventory/interfaces/inventory';
import { InventoryService } from '../../inventory/servicios/inventory.service';
import { Purchase_Detail } from '../interfaces/purchase-detail';
import { Purchase_Header } from '../interfaces/purchase-header';
import { PurchaseHeaderService} from '../servicios/purchase-header.service';
import { ProcedurePurchaseService} from '../servicios/procedure-purchase.service'
import { Procedure_Purchase } from '../interfaces/procedure-purchase';
import { Products } from '../../product/interfaces/product';
import { ProductsService } from '../../product/servicios/products.service';
import {PaymentDetailService} from '../../payment_detail_purchase/servicios/payment-detail.service';
import { Lot } from '../../lot/interfaces/lot';
import { LotService } from '../../lot/servicios/lot.service';
@Component({
  selector: 'app-purchase-header-form',
  templateUrl: './purchase-header-form.component.html',
  styleUrls: ['./purchase-header-form.component.css'],
})
export class PurchaseHeaderFormComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  paginaActual: number = 1;
  paginaActualp:number=1;
  filtrado_proveedor = '';
  filtrado_product = '';
  proveedor_seleccionado: any[''];
  vista_detail = [];
  inventory:Inventory[];
  product:Products[];
  providers: Providers[];
  inventorys: any[];
  editing: boolean = false;
  total:number=0;
  header: Purchase_Header = {
    Correlative_Number: null,
    Serie: null,
    Date_Purchase: null,
    Total: null,
    Refund:null,
    Annulment_State:null,
    Payment_Complete:null,
    Observations: null,
    Providers_Id: null,
  };
  purchase:Procedure_Purchase={
    Quantity: null,
    Unit_Price: null,
    Subtotal: null,
    Inventory_Id: null,
  }
  detail: Purchase_Detail = {
    Quantity: null,
    Unit_Price: null,
    Subtotal: null,
    Purchase_Header_Id: null,
    Inventory_Id: null,
  };
  provider: Providers = {
    Providers_Id:null,
    NIT: null,
    Fiscal_Name: null,
    Phone_Number1:null,
    Phone_Number2:null,
    Email:null,
    Address:null,
  };
  constructor(
    private inventoryService: InventoryService,
    private providerService: ProvidersService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private purchase_headerservice: PurchaseHeaderService,
    private procedure_purchaseservice: ProcedurePurchaseService,
    private productService:ProductsService,
    private payment_detail_purchase:PaymentDetailService,
    private lotService:LotService
  ) {}
  ngOnInit() {
    this.providerService.getProviders().subscribe((data: Providers[]) => {
      this.providers = data;
    });
    this.inventoryService.getInventory().subscribe((data: Inventory[]) => {
      this.inventory = data;
    });
  }
  getProviderId(id) {
    this.providerService.getProviders().subscribe((data: Providers[]) => {
      this.providers = data;
    });
    this.providerService.getProvidersId(id).subscribe((data: Providers[]) => {
      this.proveedor_seleccionado = data;
      return this.proveedor_seleccionado = Array.of(this.proveedor_seleccionado);
    });
    
  }
  lot
  getLotId(id){
    this.inventoryService.getInventory().subscribe((data: Inventory[]) => {
      this.inventory = data;
    });
    this.lotService.findPresentation(id).subscribe((data:Lot[])=>
    {
      let datos: any =data;
      datos.Subtotal=0;
      datos.Quantity=0;
      datos.Price=0;

      this.inventorys = Array.of(datos);
      this.vista_detail.push(this.inventorys);
      console.log(this.vista_detail);
    })
  }

  getProductId(id) {
    
    this.inventoryService.getInventory().subscribe((data: Inventory[]) => {
      this.inventory = data;
    });
    this.productService.getProductsId(id).subscribe((data: Products[]) => {
      console.log(data);
      //console.log(idd);
      let datos: any = data;
      datos.Subtotal = 0;
      datos.Quantity=0;
      datos.Price=0;
      //datos.Inventory_Id=idd;
      this.inventorys = Array.of(datos);
      this.vista_detail.push(this.inventorys);
      console.log(this.vista_detail);
      return this.vista_detail;
    });
    
  }
  savePost() {
    //HEADER
    this.header.Providers_Id=this.proveedor_seleccionado[0].Providers_Id;
    this.header.Refund=0;
    this.header.Annulment_State=0;
    this.header.Total=this.total;
    console.log(this.header);
   this.purchase_headerservice.save(this.header).subscribe(
      (data) => {
        alert('Compra guardada');
        console.log(data);
        window.location.reload();
      },
      (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });

    //DETAIL
    for(let misdatos of this.vista_detail)
    {
  
      this.purchase.Quantity=misdatos[0].Quantity;
      this.purchase.Unit_Price=misdatos[0].Price;
      this.purchase.Subtotal=misdatos[0].Subtotal;
      this.purchase.Inventory_Id=misdatos[0].Lot_Id;
      console.log(this.purchase);

      //console.log(this.purchase);
     this.procedure_purchaseservice.save(this.purchase).subscribe(
        (data) => {
          //alert('procedimiento almacenado guardado');
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert('Ocurrio un error');
        });
    }
  }
  cantidad = [];
  precio = [];
  onEnter(cantidad, precio, datos: any) {
    this.total-=datos[0].Subtotal;
    datos[0].Quantity= cantidad;
    datos[0].Price=precio;
    datos[0].Subtotal = cantidad * precio;
    this.total+=datos[0].Subtotal;
    this.total_cobro = this.total;
  }
  EliminarDetalle(index,datos:any) {
    this.total -= datos[0].Subtotal;
    this.vista_detail.splice(index, 1);
    console.log(this.vista_detail);
    this.total_cobro = this.total;
  }

  pago_alcontado: boolean = false;
  pago_alcredito: boolean = false;
  total_cobroalcredito: number = 0;
  total_cobroalcontado: number = 0;
  total_cobro: number = 0;
  descripcion_pagoalcontado: string = "";
  descripcion_pagoalcredito: string = "";
  encabezadoid: number = 0
  cerrarpago(){
    return this.total_cobro=this.total;
  }
  mostraralcredito(){
    this.pago_alcredito = !this.pago_alcredito;
  }
  mostraralcontado(){
    this.pago_alcontado = !this.pago_alcontado;
  }
  onPagoalcontado(value: number){
    this.total_cobroalcontado = value;
    if(this.total_cobro>=this.total_cobroalcontado)
      this.total_cobro -= this.total_cobroalcontado;
    else
      alert("Error: El pago al contado supera el monto total de lo que se esta comprando");
  }
  onPagoalcredito(value: number){
    this.total_cobroalcredito = value;
    if(this.total_cobro>=this.total_cobroalcredito)
      this.total_cobro -= this.total_cobroalcredito;
    else
      alert("Error: El pago al credito supera el monto total de lo que se esta comprando");
  }
}
