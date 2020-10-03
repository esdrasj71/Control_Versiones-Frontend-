import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Providers } from '../../providers/interfaces/providers';
import { ProvidersService } from '../../providers/servicios/providers.service';
import { Inventory } from '../../inventory/interfaces/inventory';
import { InventoryService } from '../../inventory/servicios/inventory.service';
import { Purchase_Detail } from './interfaces/purchase-detail';

@Component({
  selector: 'app-purchase-header-form',
  templateUrl: './purchase-header-form.component.html',
  styleUrls: ['./purchase-header-form.component.css']
})
export class PurchaseHeaderFormComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  paginaActual: number = 1;
  filtrado_proveedor='';
  filtrado_product = '';
  proveedor_seleccionado:any[];
  vista_detail=[];
  providers:Providers[];
  inventory: Inventory[];
  inventorys: any[];
  detail:Purchase_Detail={
    Purchase_Detail_Id:null,
    Quantity:null,
    Unit_Price:null,
    Subtotal:null,
    Purchase_Header_Id:null,
    Inventory_Id:null,
  };
  
  constructor(private inventoryService:InventoryService,private providerService:ProvidersService,private activatedRoute: ActivatedRoute, private httpClient: HttpClient) 
  { 
    
  }

  ngOnInit(){
    this.providerService.getProviders().subscribe((data: Providers[])=>{
      this.providers= data;
      //console.log(this.providers);
    });

    this.inventoryService.getInventory().subscribe((data:Inventory[])=>{
      this.inventory=data;
    })
    
  }

  getProviderId(id)
  {
    this.providerService.getProvidersId(id).subscribe((data: Providers[])=>{
       this.proveedor_seleccionado= data;
       return this.proveedor_seleccionado=Array.of(this.proveedor_seleccionado);
      });
  }
  getInventoryId(id)
  {
    this.inventoryService.getInventoryId(id).subscribe((data: Inventory[])=>{
      let datos:any  = data;
      datos.Subtotal = 0;
      this.inventorys = Array.of(datos);
      this.vista_detail.push(this.inventorys)
      console.log(this.vista_detail);
      return this.vista_detail
  });
  }
  cantidad=[];
  precio=[];
  onEnter(cantidad, precio, datos: any){
    datos[0].Subtotal = cantidad * precio;
    console.log(datos);
  }
  EliminarDetalle(index) {
    this.vista_detail.splice(index,1);
    console.log(this.vista_detail);
}
}
