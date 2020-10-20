import { Component, OnInit } from '@angular/core';
import { DebsToPayService } from '../servicios/debs-to-pay.service';
import { HttpClient } from '@angular/common/http';
import { DebstoPay } from '../interfaces/debs-to-pay';

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
  constructor( private debstopayService: DebsToPayService, private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'DebstoPay')
    .subscribe((data: DebstoPay[]) => {
      this.debstopay = data;
      console.log(this.debstopay);
    });
   }

  ngOnInit(): void {
  }

  searchTerm3 = '';
  
  mostrar_facturas(providersId){
    this.httpClient.get(this.API_ENDPOINT + 'DebstoPay/'+ providersId)
    .subscribe((data:DebstoPay[])=>{
      this.bills = data;
      console.log(this.bills);
      console.log(providersId);
    }) 
  }
  
  mostrar_facturas_detalle(purchaseheaderId){
    this.httpClient.get(this.API_ENDPOINT + 'DebstoPayPurchase/'+ purchaseheaderId)
    .subscribe((data:DebstoPay[])=>{
      this.billsdetail = data;
      console.log(this.billsdetail);
      console.log(purchaseheaderId);
    }) 
  }
}
