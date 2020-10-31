import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { InventoryReportsService } from '../servicios/inventory-reports.service';
import { InventoryReports2Service } from '../servicios/inventory-reports2.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryReport1 } from '../interfaces/report1';
import { InventoryReport2 } from '../interfaces/report2';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-inventory-reports-home',
  templateUrl: './inventory-reports-home.component.html',
  styleUrls: ['./inventory-reports-home.component.css']
})
export class InventoryReportsHomeComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChild('pdfTable2') pdfTable2: ElementRef;
  API_ENDPOINT = 'http://localhost:3000/';
  //Variables
  reportone: InventoryReport1[];
  detail: InventoryReport1[];
  Total = 0;
  cont = 0;
  Existe=0;
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
  imprimir()
{
  const doc = new jsPDF();
  //get table html
  const pdfTable = this.pdfTable.nativeElement;
  //html to pdf format
  var html = htmlToPdfmake("<b>Nombre del sistema </b></br>"+ "<b>Fecha consultada del "+this.report1.Date1+" al "+this.report1.Date2 +"</b></br>" +pdfTable.innerHTML);
 
  const documentDefinition = { content: html };
  pdfMake.createPdf(documentDefinition).open();
}

imprimir2()
{
  const doc = new jsPDF();
  //get table html
  const pdfTable2 = this.pdfTable2.nativeElement;
  //html to pdf format
  var html = htmlToPdfmake("<b>Nombre del sistema </b></br>"+ "<b>Fecha consultada del "+this.report2.Date1+" al "+this.report2.Date2 +"</b></br> Detalle de la compra </br> " +pdfTable2.innerHTML);
 
  const documentDefinition = { content: html };
  pdfMake.createPdf(documentDefinition).open();
}
   //Principal
   Reporte1() {
    if (this.report1.Date1 == null || this.report1.Date2 == null) {
      alert("Debe llenar todos los campos")
    }
    else {
      this.inventoryreportService.showreport1(this.report1).subscribe((data) => {
        if (data[0] == 0) {
          this.Existe=0;
          this.reportone=[];
          alert('No existe inventario en ese rango de fechas');
        }
        else {
          this.Existe=1;
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
