import { Component, OnInit } from '@angular/core';
import { Providers } from '../../providers/interfaces/providers';
import { HttpClient } from '@angular/common/http';
import { ProvidersService } from '../../providers/servicios/providers.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-purchase-header-form',
  templateUrl: './purchase-header-form.component.html',
  styleUrls: ['./purchase-header-form.component.css']
})
export class PurchaseHeaderFormComponent implements OnInit {
  filtrado_proveedor='';
  proveedor_seleccionado:any[];
  providers:Providers[];
  constructor(private providerService:ProvidersService,private activatedRoute: ActivatedRoute, private httpClient: HttpClient) 
  { 
    
  }

  ngOnInit(){
    this.providerService.getProviders().subscribe((data: Providers[])=>{
    return this.providers= data;
    })
  }
  getProviderId(id)
  {
    
    this.providerService.getProvidersId(id).subscribe((data: Providers[])=>{
       this.proveedor_seleccionado= data;
       return this.proveedor_seleccionado=Array.of(this.proveedor_seleccionado);
      });
  
      
  }
}
