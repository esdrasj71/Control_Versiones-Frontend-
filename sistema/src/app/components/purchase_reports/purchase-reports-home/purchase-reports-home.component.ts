import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { PurchaseReportsService } from '../servicios/purchase-reports.service';
import { PurchaseReports2Service } from '../servicios/purchase-reports2.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PurchaseReport1 } from '../interfaces/report1';
import { PurchaseReport2 } from '../interfaces/report2';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-purchase-reports-home',
  templateUrl: './purchase-reports-home.component.html',
  styleUrls: ['./purchase-reports-home.component.css']
})
export class PurchaseReportsHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';

  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChild('pdfTable2') pdfTable2: ElementRef;
  reportone: PurchaseReport1[];
  detail: PurchaseReport1[];
  detail2: PurchaseReport2[];
  Total = 0;
  cont = 0;
  Existe=0;

  //Report1
  report1: PurchaseReport1 = {
    Date1: null,
    Date2: null
  };

report2: PurchaseReport2 = {
  Date1: null,
  Date2: null,
  ProvidersId: null
};
constructor(private purchasereportService: PurchaseReportsService, private purchasereport2Service: PurchaseReports2Service ,private httpClient: HttpClient) {

  }
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
  var html = htmlToPdfmake("<b>Nombre del sistema </b></br>"+ "<b>Fecha consultada del "+this.report1.Date1+" al "+this.report1.Date2 +"</b></br> Detalle de la compra </br> " +pdfTable2.innerHTML);
 
  const documentDefinition = { content: html };
  pdfMake.createPdf(documentDefinition).open();
}
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

  Reporte1() {
    if (this.report1.Date1 == null || this.report1.Date2 == null) {
      alert("Debe llenar todos los campos")
    }
    else {
      this.purchasereportService.showreport1(this.report1).subscribe((data) => {
        this.reportone = data[0];
        console.log(this.reportone[0]);
        if (data[0] == 0) {
          this.Existe=0;
          this.reportone=[];
          alert('No existen compras en ese rango de fechas');
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

}
