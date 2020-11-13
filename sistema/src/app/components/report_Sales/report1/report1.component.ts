import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {Report1Service} from '../servicios/report1.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Report2} from '../interfaces/report2';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ExpendituresService } from '../../expenditures/servicios/expenditures.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css']
})
export class Report1Component implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  API_ENDPOINT = 'http://localhost:3000/';
  empresa: any = [];
  report2: Report2 = {
    fechainicio: null,
    fechafin: null,
  }
  repor1: Report2[];
  reportt1 = [];
  total_total = 0;
  date = new Date();
  constructor(private report1Service: Report1Service, private httpClient: HttpClient,private expendituresService:ExpendituresService) { 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    httpClient.get(this.API_ENDPOINT + 'series',{headers}).subscribe((data: Report2[])=>{
      this.repor1 = data;
      //console.log(this.repor1);

    })
  }

  ngOnInit(): void {
    this.expendituresService.getempresa().subscribe((data) => {
      this.empresa = data[0];
      return this.empresa;
    })
  }
  saveReport1(){
    if (this.report2.fechainicio == null || this.report2.fechafin == null) {
      Swal.fire({icon: 'warning', title: 'Aviso!', text: 'Debe llenar todos los campos'}); 
    }else{
      this.report1Service.getReport1(this.report2).subscribe((data)=>{
        this.reportt1 = [];
        this.repor1.forEach(e => {
          let temp = [];
          let total_Serie = 0;
          let temp2 = {};
          
          data[0].forEach(g => {
            if(e["Serie_Id"] == g["Serie"]){
              temp2 = g;
              temp2['Serie']=e["Serie_Id"];
              temp.push(temp2);
              total_Serie += g["Total"];
             
            }
          });
          this.total_total += total_Serie;  
          temp.push(total_Serie);
          temp.push(e["Serie"]);
          this.reportt1.push(temp);
          console.log(this.reportt1);
        });
      }, (error)=>{
        //console.log(error);
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
      <b>Reporte: Facturas emitidas agrupadas por series</b>
    </p>
    <p>
     <b>La fecha en la que se generó el reporte fue: del ` +this.report2.fechainicio+ ` al `+this.report2.fechafin +` </b>
    </p>
    <p>
    <b>Este reporte se genero el día: `+creado +`</b> 
    </p>
    </div>
    `
      +pdfTable.innerHTML);
   
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
}
