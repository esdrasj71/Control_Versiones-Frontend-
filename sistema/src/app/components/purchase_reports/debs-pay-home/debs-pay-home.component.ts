import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DebsPay } from '../interfaces/report3';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-debs-pay-home',
  templateUrl: './debs-pay-home.component.html',
  styleUrls: ['./debs-pay-home.component.css']
})
export class DebsPayHomeComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  API_ENDPOINT = 'http://localhost:3000/';
  debs : DebsPay[]
  constructor(private httpClient: HttpClient) { 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'purchase_report3', { headers })
      .subscribe((data: DebsPay[]) => {
        this.debs = data;
        console.log(this.debs);
      });
  }

  ngOnInit(): void {
  }

  imprimir()
{
  const doc = new jsPDF();
  //get table html
  const pdfTable = this.pdfTable.nativeElement;
  //html to pdf format
  var html = htmlToPdfmake("<b>Nombre del sistema </b></br> <b> Cuentas por pagar </b> </br>" +pdfTable.innerHTML);
 
  const documentDefinition = { content: html };
  pdfMake.createPdf(documentDefinition).open();
}
}
