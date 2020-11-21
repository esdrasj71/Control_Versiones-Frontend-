import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DebsPay } from '../interfaces/report3';
import { DebstoPay } from '../../debs_to_pay/interfaces/debs-to-pay';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ExpendituresService } from '../../expenditures/servicios/expenditures.service';
@Component({
  selector: 'app-debs-pay-home',
  templateUrl: './debs-pay-home.component.html',
  styleUrls: ['./debs-pay-home.component.css']
})
export class DebsPayHomeComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  API_ENDPOINT = 'http://localhost:3000/';
  debs : DebsPay[];
  debsTotal: DebstoPay[];
  date = new Date();
  empresa: any = [];
  constructor(private httpClient: HttpClient, private expendituresService:ExpendituresService) { 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'purchase_report3', { headers })
      .subscribe((data: DebsPay[]) => {
        this.debs = data;
      });
      httpClient.get(this.API_ENDPOINT + 'DebstoPayTotal', { headers })
      .subscribe((data: DebstoPay[]) => {
        this.debsTotal = data;
      })
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
  <h1>Quetzal Finance</h1>
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
    <b>Reporte: </b> <b> Cuentas por pagar vigentes.</b>
  </p>
  <p>
   <b></b> La fecha en la que se genero fue: <b> ` + creado + `</b>
  </p>
  </div>
  ` 
  +pdfTable.innerHTML);
 
  const documentDefinition = { content: html };
  pdfMake.createPdf(documentDefinition).open();
}
}
