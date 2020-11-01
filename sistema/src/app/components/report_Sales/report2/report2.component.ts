import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {Reports2Service} from '../servicios/reports2.service';
import {HttpClient} from '@angular/common/http';
import {Report2} from '../interfaces/report2';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.css']
})
export class Report2Component implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  API_ENDPOINT = 'http://localhost:3000/';
  report2: Report2 = {
    fechainicio: null,
    fechafin: null,
  }
  repor2: Report2[];
  constructor(private report2Service: Reports2Service, private httpClient: HttpClient) {
  
   }
 
  ngOnInit(): void {
    
  }
  saveReport2(){
    this.report2Service.savereport2(this.report2).subscribe((data)=>{
      alert('Reporte 2 generado');
      console.log(data[0]);
      this.repor2 = data[0];
      
    }, (error)=>{
      console.log(error);
      alert('Error en reporte 2');
    })
   
  }
  downloadPDF() {
    const doc = new jsPDF();
    //get table html
    const pdfTable = this.pdfTable.nativeElement;
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);
   
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }

}
