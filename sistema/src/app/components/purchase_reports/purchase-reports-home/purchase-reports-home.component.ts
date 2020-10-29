import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { PurchaseReportsService} from '../servicios/purchase-reports.service';
import { PurchaseReport1 } from '../interfaces/report1';
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
  //Report1
  report1: PurchaseReport1 ={
    Date1: null,
    Date2: null
  };
  reportone:PurchaseReport1[];


  constructor(private purchasereportService: PurchaseReportsService) { 
    
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

  Reporte1() {
    if (this.report1.Date1 == null || this.report1.Date2 == null ) {
      alert("Debe llenar todos los campos")
    }
    else {
      this.purchasereportService.showreport1(this.report1).subscribe((data) => {
        this.reportone = data[0];
        console.log(this.reportone[0]);
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      })
    }
  }

}
