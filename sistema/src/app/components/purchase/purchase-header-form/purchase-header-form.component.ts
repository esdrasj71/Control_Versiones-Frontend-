import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Providers } from '../../providers/interfaces/providers';
import { ProvidersService } from '../../providers/servicios/providers.service';
import { Inventory } from '../../inventory/interfaces/inventory';
import { Purchase_Detail } from './interfaces/purchase-detail';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
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
  detail:Purchase_Detail={
    Purchase_Detail_Id:null,
    Quantity:null,
    Unit_Price:null,
    Subtotal:null,
    Purchase_Header_Id:null,
    Inventory_Id:null,
  };
  constructor(private providerService:ProvidersService,private activatedRoute: ActivatedRoute, private httpClient: HttpClient) 
  { 
    httpClient.get(this.API_ENDPOINT + 'inventory')
      .subscribe((data: Inventory[]) => {
        this.inventory = data; //Se debe acceder al arreglo de este modo, oAngular lo reconocera como un objeto del tipo Post
        //console.log(this.inventory);
      });
  }

  ngOnInit(){
    this.providerService.getProviders().subscribe((data: Providers[])=>{
      this.providers= data;
      //console.log(this.providers);
    });
  }

  getProviderId(id)
  {
    this.providerService.getProvidersId(id).subscribe((data: Providers[])=>{
       this.proveedor_seleccionado= data;
       return this.proveedor_seleccionado=Array.of(this.proveedor_seleccionado);
      });
  }
}
