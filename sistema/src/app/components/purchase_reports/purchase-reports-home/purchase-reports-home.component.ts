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
import Swal from 'sweetalert2';
import { ExpendituresService } from '../../expenditures/servicios/expenditures.service';
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
  empresa: any = [];
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
date = new Date();
constructor(private purchasereportService: PurchaseReportsService, private purchasereport2Service: PurchaseReports2Service ,private httpClient: HttpClient,private expendituresService:ExpendituresService) {

  }
  ngOnInit(): void {
    this.expendituresService.getempresa().subscribe((data) => {
      this.empresa = data[0];
      return this.empresa;
    })
  }

imprimir()
{
  let mes = this.date.getMonth() + 1;
  let fecha =
   this.date.getDate() +
    '/' +
    mes.toString() +
    '/' +
    this.date.getFullYear();
let creado = fecha;
  const doc = new jsPDF();
  //get table html
  const pdfTable = this.pdfTable.nativeElement;
  //html to pdf format
  var html = htmlToPdfmake(`
  <div style = "text-align:center;">
  <h1>Quetzal Commerce</h1>
  <p>
  <b>Empresa: </b> `+this.empresa.Company_Name+`
  </p>
  <p>
  <b>Dirección: </b> `+this.empresa.Address+`
  </p>
  <p>
  <b>NIT: </b> `+this.empresa.NIT+`
  </p>
 </div> 
  <div style = "text-align:justify;">
  <p>
    <b>Reporte Detallado de Compras.</b>
  </p>
  <p>
   <b>Reporte del: ` +this.report1.Date1+ ` al `+this.report1.Date2 +` </b>
  </p>
  <p>
  <b>Este reporte se genero el día: `+creado +`</b> 
  </p>
  </div>
  ` +pdfTable.innerHTML);
 
  const documentDefinition = { content: html };
  pdfMake.createPdf(documentDefinition).open();
}

imprimir2()
{
  let mes = this.date.getMonth() + 1;
  let fecha =
   this.date.getDate() +
    '/' +
    mes.toString() +
    '/' +
    this.date.getFullYear();
let creado = fecha;
  const doc = new jsPDF();
  //get table html
  const pdfTable2 = this.pdfTable2.nativeElement;
  //html to pdf format
  var html = htmlToPdfmake(`
  <div style = "text-align:center;">
  <h1>Quetzal Commerce</h1>
  <p>
  <b>Empresa: </b> `+this.empresa.Company_Name+`
  </p>
  <p>
  <b>Dirección: </b> `+this.empresa.Address+`
  </p>
  <p>
  <b>NIT: </b> `+this.empresa.NIT+`
  </p>
 </div> 
  <div style = "text-align:justify;">
  <p>
    <b>Reporte: Detalle de compras.</b>
  </p>
  <p>
   <b>Reporte del: ` +this.report1.Date1+ ` al `+this.report1.Date2 +` </b>
  </p>
  <p>
  <b>Este reporte se genero el día: `+creado +`</b> 
  </p>
  </div>
  `
     +pdfTable2.innerHTML);
 
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
      Swal.fire({icon: 'warning', title: 'Aviso!', text: 'Debe llenar todos los campos'}); 
    }
    else {
      this.purchasereportService.showreport1(this.report1).subscribe((data) => {
        this.reportone = data[0];
        if (data[0] == 0) {
          this.Existe=0;
          this.reportone=[];
          Swal.fire({icon: 'error', title: 'Ocurrio un error', text: 'No existen compras en ese rango de fechas'})
        }
        else {
          this.Existe=1;
          this.reportone = data[0];
        }
      }, (error) => {
        //console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      })
    }
  }

}
