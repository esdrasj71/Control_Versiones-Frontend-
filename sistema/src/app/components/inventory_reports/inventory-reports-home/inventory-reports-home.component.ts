import { Component, OnInit } from '@angular/core';
import { InventoryReportsService } from '../servicios/inventory-reports.service';
import { InventoryReports2Service } from '../servicios/inventory-reports2.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryReport1 } from '../interfaces/report1';
import { InventoryReport2 } from '../interfaces/report2';

@Component({
  selector: 'app-inventory-reports-home',
  templateUrl: './inventory-reports-home.component.html',
  styleUrls: ['./inventory-reports-home.component.css']
})
export class InventoryReportsHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  //Variables
  reportone: InventoryReport1[];
  detail: InventoryReport1[];
  Total = 0;
  cont = 0;

   //Report1
   report1: InventoryReport1 = {
    Date1: null,
    Date2: null
  };
   //Report2
   report2: InventoryReport2 = {
    Date1: null,
    Date2: null,
    ProductId: null
  };

  constructor(private inventoryreportService: InventoryReportsService,  private inventoryreport2Service: InventoryReports2Service, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
   //Principal
   Reporte1() {
    if (this.report1.Date1 == null || this.report1.Date2 == null) {
      alert("Debe llenar todos los campos")
    }
    else {
      this.inventoryreportService.showreport1(this.report1).subscribe((data) => {
        if (data[0] == 0) {
          alert('No existe inventario en ese rango de fechas');
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
  ///Detalle
  mostrar(Date1, Date2, ProductId, total) {
    this.report2.Date1 = Date1;
    this.report2.Date2 = Date2;
    this.report2.ProductId = ProductId;
    this.inventoryreport2Service.showreport2(this.report2).subscribe((data)=>{
      this.detail = data[0];
      this.cont = this.detail.length;
    })
    this.Total = total;
  }

}
