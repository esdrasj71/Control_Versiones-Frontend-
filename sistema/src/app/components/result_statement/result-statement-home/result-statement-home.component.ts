import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ResultStatementService} from '../servicios/result-statement.service';
import {HttpClient} from '@angular/common/http';
import {ResultStatement} from '../interfaces/result_statement';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ExpendituresService } from '../../expenditures/servicios/expenditures.service';

import Swal from 'sweetalert2';
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
  empresa: any = [];
  date = new Date();
  constructor(private resultStatementService: ResultStatementService, private httpCliente: HttpClient,private expendituresService:ExpendituresService) { 

  }

  ngOnInit(): void {
    this.expendituresService.getempresa().subscribe((data) => {
      this.empresa = data[0];
      return this.empresa;
    });
  }

  estadoresult(){
    if(this.resultstatement.fechainicio == null && this.resultstatement.fechafin == null){
      Swal.fire({icon: 'warning', title: 'Aviso!', text: 'Debe llenar todos los campos'}); 
    }else{
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
      <b>Reporte: Estado de resultados.</b>
    </p>
    <p>
    <b>La fecha en la que se generó el reporte fue: del ` +this.resultstatement.fechainicio+ ` al `+this.resultstatement.fechafin+` </b>
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
