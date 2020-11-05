import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ResultStatementService} from '../servicios/result-statement.service';
import {HttpClient} from '@angular/common/http';
import {ResultStatement} from '../interfaces/result_statement';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-result-statement-home',
  templateUrl: './result-statement-home.component.html',
  styleUrls: ['./result-statement-home.component.css']
})
export class ResultStatementHomeComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  API_ENDPOINT = 'http://localhost:3000/';
  resultstatement: ResultStatement = {
    fechainicio: null,
    fechafin: null,
  }
  resultsta: ResultStatement[];
  total_ingreso: any = [];
  total_costos: any = [];
  detalle_costos: any = [];
  utilidad_bruta: any = [];
  total_gastos: any = [];
  detalle_gastos: any = [];
  utilidad_operativa: any = [];
  constructor(private resultStatementService: ResultStatementService, private httpCliente: HttpClient) { 

  }

  ngOnInit(): void {
  }

  estadoresult(){
    this.resultStatementService.saveresultStatement(this.resultstatement).subscribe((data)=>{
      console.log(data);
      this.total_ingreso = data[0];
      this.total_costos = data[1];
      this.detalle_costos = data[4];
      this.utilidad_bruta = data[5];
      this.total_gastos = data[2]
      this.detalle_gastos = data[3];
      this.utilidad_operativa = data[6];
      
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
