import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Reports3Service} from '../servicios/reports3.service';
import {Report3} from '../interfaces/report3';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ExpendituresService } from '../../expenditures/servicios/expenditures.service';

@Component({
  selector: 'app-report3',
  templateUrl: './report3.component.html',
  styleUrls: ['./report3.component.css']
})
export class Report3Component implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  report3: Report3[];
  empresa: any = [];
  date = new Date();
  constructor(private report3Service: Reports3Service,private expendituresService:ExpendituresService) { }

  ngOnInit(): void {
    this.report3Service.getReport3().subscribe((data: Report3[]) => {
      return this.report3 = data;
    });
    this.expendituresService.getempresa().subscribe((data) => {
      this.empresa = data[0];
      return this.empresa;
    });
  }
  downloadPDF() {
    let mes = this.date.getMonth() + 1;
    let fecha =

      this.date.getFullYear()
      +
      '-' +
      mes.toString() +
      '-'  +   this.date.getDate(); 
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
      <b>Reporte: Cuentas por cobrar vigentes.</b>
    </p>
    <p>
    <b>Este reporte se genero el día: `+creado +`</b> 
    </p>
    </div>
    `+pdfTable.innerHTML);
   
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }

}
