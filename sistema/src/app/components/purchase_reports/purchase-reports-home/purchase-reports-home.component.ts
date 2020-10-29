import { Component, OnInit } from '@angular/core';
import { PurchaseReportsService} from '../servicios/purchase-reports.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PurchaseReport1 } from '../interfaces/report1';

@Component({
  selector: 'app-purchase-reports-home',
  templateUrl: './purchase-reports-home.component.html',
  styleUrls: ['./purchase-reports-home.component.css']
})
export class PurchaseReportsHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  //Report1
  report1: PurchaseReport1 ={
    Date1: null,
    Date2: null
  };

  reportone: PurchaseReport1[];

  constructor(private purchasereportService: PurchaseReportsService, private httpClient: HttpClient) { 
    
  }

  ngOnInit(): void {
  }

  Reporte1() {
    if (this.report1.Date1 == null || this.report1.Date2 == null ) {
      alert("Debe llenar todos los campos")
    }
    else {
      this.purchasereportService.showreport1(this.report1).subscribe((data) => {
        console.log(this.report1);
        this.reportone = data[0];
        console.log(this.reportone);
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      })
    }
  }

}
