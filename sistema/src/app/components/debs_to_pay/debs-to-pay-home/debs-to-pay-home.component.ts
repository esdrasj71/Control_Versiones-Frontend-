import { Component, OnInit } from '@angular/core';
import { DebsToPayService } from '../servicios/debs-to-pay.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DebstoPay } from '../interfaces/debs-to-pay';
import { Procedure_DebstoPay } from '../interfaces/procedure_debstopay';
import Swal from 'sweetalert2';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-debs-to-pay-home',
  templateUrl: './debs-to-pay-home.component.html',
  styleUrls: ['./debs-to-pay-home.component.css']
})
export class DebsToPayHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  debstopay: DebstoPay[];
  bills: DebstoPay[];
  billsdetail: DebstoPay[];
  billstotal: DebstoPay[];
  //Debs to pay
  procedure_debstopay: Procedure_DebstoPay = {
    Providers_Id: null,
    Quantity: null,
    Description: null,
  };

  cont = 0;

  constructor(private debstopayService: DebsToPayService, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'DebstoPay', { headers })
      .subscribe((data: DebstoPay[]) => {
        this.debstopay = data;
      });
      httpClient.get(this.API_ENDPOINT + 'DebstoPayTotal', { headers })
      .subscribe((data: DebstoPay[]) => {
        this.billstotal = data;
      })
  }

  ngOnInit(): void {
  }

  searchTerm3 = '';
  //Modal Detail 1
  Fiscal_Name = "";
  Nit = "";
  Total_Debs = 0;
  //Modal Detail 2
  Total = 0;
  TotalPurchase = 0;

  mostrar_facturas(providersId, fiscal_name, nit, total_debs) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });

    this.procedure_debstopay.Providers_Id = providersId;
    this.httpClient.get(this.API_ENDPOINT + 'DebstoPay/' + providersId, { headers })
      .subscribe((data: DebstoPay[]) => {
        this.bills = data;
        this.cont = this.bills.length;
      })
    this.Fiscal_Name = fiscal_name;
    this.Nit = nit;
    this.Total_Debs = total_debs;
  }

  mostrar_facturas_detalle(purchaseheaderId, total, totalpurchase) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.httpClient.get(this.API_ENDPOINT + 'DebstoPayPurchase/' + purchaseheaderId, { headers })
      .subscribe((data: DebstoPay[]) => {
        this.billsdetail = data;
      })
    this.Total = total;
    this.TotalPurchase = totalpurchase;
  }
  saveDebs() {
    if (this.procedure_debstopay.Quantity > this.Total_Debs) {
      Swal.fire({icon: 'error', title: 'Ocurrio un error', text: 'La cantidad excede a la requerida'})
    }
    else {
      this.debstopayService.saveprocedure(this.procedure_debstopay).subscribe((data) => {
        Swal.fire('Pago Exitoso', '','success');
        window.setTimeout(function(){location.reload()},1100)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      })
    }
  }
  onSubmit(form: NgForm) {
    form.resetForm();
}
}