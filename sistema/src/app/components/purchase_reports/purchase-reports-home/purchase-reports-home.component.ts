import { Component, OnInit } from '@angular/core';
import { PurchaseReportsService } from '../servicios/purchase-reports.service';
import { PurchaseReports2Service } from '../servicios/purchase-reports2.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PurchaseReport1 } from '../interfaces/report1';
import { PurchaseReport2 } from '../interfaces/report2';

@Component({
  selector: 'app-purchase-reports-home',
  templateUrl: './purchase-reports-home.component.html',
  styleUrls: ['./purchase-reports-home.component.css']
})
export class PurchaseReportsHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  //Variables
  reportone: PurchaseReport1[];
  detail: PurchaseReport1[];
  detail2: PurchaseReport2[];
  Total = 0;
  cont = 0;

  //Report1
  report1: PurchaseReport1 = {
    Date1: null,
    Date2: null
  };
  //Report2
  report2: PurchaseReport2 = {
    Date1: null,
    Date2: null,
    ProvidersId: null
  };
  constructor(private purchasereportService: PurchaseReportsService, private purchasereport2Service: PurchaseReports2Service ,private httpClient: HttpClient) {

  }
  ngOnInit(): void {
  }
  ///
  mostrar(Date1, Date2, ProvidersId, total) {
    this.report2.Date1 = Date1;
    this.report2.Date2 = Date2;
    this.report2.ProvidersId = ProvidersId;
    this.purchasereport2Service.showreport2(this.report2).subscribe((data)=>{
      this.detail2 = data[0];
      this.cont = this.detail2.length;
    })
    this.Total = total;
  }
  //
  Reporte1() {
    if (this.report1.Date1 == null || this.report1.Date2 == null) {
      alert("Debe llenar todos los campos")
    }
    else {
      this.purchasereportService.showreport1(this.report1).subscribe((data) => {
        if (data[0] == 0) {
          alert('No existen compras en ese rango de fechas');
        }
        else {
          console.log(this.report1);
          this.reportone = data[0];
          console.log(this.reportone);
        }
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      })
    }
  }

}
