import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Procedure_AccountsReceivable} from '../interfaces/procedure_accounts_receivable';
import {AccountsRecivable} from '../interfaces/accounts-receivable';
import {Payment} from '../interfaces/payment';

import { AccountsReceivableService} from '../servicios/accounts-receivable.service';
import {ProcedureAccountsreceivableService} from '../servicios/procedure-accountsreceivable.service';


@Component({
  selector: 'app-accounts-receivable',
  templateUrl: './accounts-receivable.component.html',
  styleUrls: ['./accounts-receivable.component.css']
})
export class AccountsReceivableComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  accounts_recivable: AccountsRecivable[];
  facturas: AccountsRecivable[];
  datalles_facturas: AccountsRecivable[];
  nombre_cliente = "";
  Nit= "";
  total_cobrar= 0; 
  contador = 0;
  //Cargar metodos de pago
  tipos_pagos: Payment[];
  cadena_pago: string = "";

  procedure_accountsReceivable: Procedure_AccountsReceivable ={
    Customers_Id: null,
    Quantity: null,
    Description: null,
    Payment_Id: null,
    
  }

  //filtro para buscar cliente
  filtrado_clientes = '';
  constructor(private accountsReceivableService: AccountsReceivableService, private httpClient: HttpClient, private procedure_accountsService: ProcedureAccountsreceivableService) {
    httpClient.get(this.API_ENDPOINT + 'accounts_receivable')
    .subscribe((data: AccountsRecivable[])=>{
      this.accounts_recivable = data;
    })
    
    httpClient.get(this.API_ENDPOINT + 'payment')
    .subscribe((data: Payment[])=>{
      this.tipos_pagos = data;
    })
   }

  ngOnInit(): void {
  }

  mostrar_facturas(idcliente, nombre, nit, total_cobrar){
    this.procedure_accountsReceivable.Customers_Id = idcliente;
    this.httpClient.get(this.API_ENDPOINT + 'accounts_receivable/'+idcliente)
    .subscribe((data:AccountsRecivable[])=>{
      this.facturas = data;
      this.contador = this.facturas.length;
    })
    this.nombre_cliente = nombre;
    this.Nit = nit;
    this.total_cobrar = total_cobrar;
  }
  
  mostrarDetalle_facturas(idbillHeader){
    this.httpClient.get(this.API_ENDPOINT + 'accounts_receivablee/'+ idbillHeader)
    .subscribe((data:AccountsRecivable[])=>{
      this.datalles_facturas = data;
    })
  }
  resta = 0;
  saveProcedure(){
    if(this.procedure_accountsReceivable.Quantity > this.total_cobrar){
    
      this.procedure_accountsReceivable.Quantity = this.total_cobrar;
    }
  this.procedure_accountsService.saveprocedure(this.procedure_accountsReceivable).subscribe((data)=>{
    console.log(data);
    alert('Descuento exitoso');
  },(error)=>{
    console.log(error);
  
    alert('Ocurrio un error en descuento');
  })
  }

}
