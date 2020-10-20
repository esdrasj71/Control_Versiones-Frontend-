import { Component, OnInit } from '@angular/core';
import { DebstoPay } from '../interfaces/debs-to-pay';
import { DebsToPayService} from '../servicios/debs-to-pay.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-debs-to-pay-form',
  templateUrl: './debs-to-pay-form.component.html',
  styleUrls: ['./debs-to-pay-form.component.css']
})
export class DebsToPayFormComponent implements OnInit {
  debstopay: DebstoPay ={
    Quantity: null,
    Total: null,
    Statuss: null,
    Date: null,
  };
  
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; 
  debsarr: DebstoPay[]; 
  constructor(private debstopayService: DebsToPayService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    
   }

  ngOnInit(): void {
  }

  savePost(){
    console.log(this.debstopay);
  }

}
