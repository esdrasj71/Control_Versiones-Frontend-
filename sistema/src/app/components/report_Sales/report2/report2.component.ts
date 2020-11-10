import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {Reports2Service} from '../servicios/reports2.service';
import {HttpClient} from '@angular/common/http';
import {Report2} from '../interfaces/report2';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ExpendituresService } from '../../expenditures/servicios/expenditures.service';
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
  empresa: any = [];
  date = new Date();
  constructor(private report2Service: Reports2Service, private httpClient: HttpClient,private expendituresService:ExpendituresService) {
  
   }
 
  ngOnInit(): void {
    this.expendituresService.getempresa().subscribe((data) => {
      this.empresa = data[0];
      return this.empresa;
    })
  }
  saveReport2(){
    this.report2Service.savereport2(this.report2).subscribe((data)=>{
      alert('Reporte 2 generado');
      this.repor2 = data[0];
      
    }, (error)=>{
      console.log(error);
      alert('Error en reporte 2');
    })
   
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
    <h1>Quetzal Commerce ®</h1>
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
      <b>Reporte: Clientes más frecuentes.</b>
    </p>
    <p>
     <b>La fecha en la que se generó el reporte fue: del ` +this.report2.fechainicio+ ` al `+this.report2.fechafin +` </b>
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
