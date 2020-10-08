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
@Component({
  selector: 'app-purchase-header-form',
  templateUrl: './purchase-header-form.component.html',
  styleUrls: ['./purchase-header-form.component.css'],
})
export class PurchaseHeaderFormComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  paginaActual: number = 1;
  filtrado_proveedor = '';
  filtrado_product = '';
  proveedor_seleccionado: any[''];
  vista_detail = [];
  providers: Providers[];
  inventory: Inventory[];
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

  constructor(
    private inventoryService: InventoryService,
    private providerService: ProvidersService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private purchase_headerservice: PurchaseHeaderService,
    private procedure_purchaseservice: ProcedurePurchaseService
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
    this.providerService.getProvidersId(id).subscribe((data: Providers[]) => {
      this.proveedor_seleccionado = data;
      return this.proveedor_seleccionado = Array.of(this.proveedor_seleccionado);
    });
  }
  getInventoryId(id) {
    this.inventoryService.getInventoryId(id).subscribe((data: Inventory[]) => {
      let datos: any = data;
      datos.Subtotal = 0;
      datos.Quantity=0;
      datos.Price=0;
      this.inventorys = Array.of(datos);
      this.vista_detail.push(this.inventorys);
     // console.log(this.vista_detail);
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
        alert('Venta guardada');
        console.log(data);
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
      this.purchase.Inventory_Id=misdatos[0].Inventory_Id;
      console.log(this.purchase);
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
  }
  EliminarDetalle(index,datos:any) {
    this.total -= datos[0].Subtotal;
    this.vista_detail.splice(index, 1);
    console.log(this.vista_detail);
  }
}
