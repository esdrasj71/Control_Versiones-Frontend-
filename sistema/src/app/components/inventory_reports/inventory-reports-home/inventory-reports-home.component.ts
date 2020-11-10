import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InventoryReportsService } from '../servicios/inventory-reports.service';
import { InventoryReports2Service } from '../servicios/inventory-reports2.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryReport1 } from '../interfaces/report1';
import { InventoryReport2 } from '../interfaces/report2';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake'; 
import Swal from 'sweetalert2';
import { ExpendituresService } from '../../expenditures/servicios/expenditures.service';
@Component({
  selector: 'app-inventory-reports-home',
  templateUrl: './inventory-reports-home.component.html',
  styleUrls: ['./inventory-reports-home.component.css']
})
export class InventoryReportsHomeComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChild('pdfTable2') pdfTable2: ElementRef;
  API_ENDPOINT = 'http://localhost:3000/';
  empresa: any = [];
  date = new Date();
  //Variables
  reportone: InventoryReport1[];
  detail: InventoryReport1[];
  Total = 0;
  cont = 0;
  Existe = 0;
  //Report1
  report1: InventoryReport1 = {
    Date1: null,
    Date2: null
  };
  //Report2
  report2: InventoryReport2 = {
    Date1: null,
    Date2: null,
    ProductId: null
  };

  constructor(private inventoryreportService: InventoryReportsService, private inventoryreport2Service: InventoryReports2Service, private httpClient: HttpClient,private expendituresService:ExpendituresService) { }

  ngOnInit(): void {
    this.expendituresService.getempresa().subscribe((data) => {
      this.empresa = data[0];
      return this.empresa;
    });
  }
  imprimir() {
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
      <b>Reporte: Reporte de inventario.</b>
    </p>
    <p>
    <b>La fecha en la que se generó el reporte fue: del ` +this.report1.Date1+ ` al `+this.report1.Date2 +` </b>
   </p>
    <p>
    <b>Este reporte se genero el día: `+creado +`</b> 
    </p>
    </div>
    ` + pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }

  imprimir2() {
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
    const pdfTable2 = this.pdfTable2.nativeElement;
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
      <b>Reporte: Reporte detallado de inventario.</b>
    </p>
    <p>
    <b>La fecha en la que se generó el reporte fue: del ` +this.report1.Date1+ ` al `+this.report1.Date2 +` </b>
   </p>
    <p>
    <b>Este reporte se genero el día: `+creado +`</b> 
    </p>
    </div>
    `+ pdfTable2.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  //Principal
  Reporte1() {
    if (this.report1.Date1 == null || this.report1.Date2 == null) {
      Swal.fire({icon: 'warning', title: 'Aviso!', text: 'Debe llenar todos los campos'}); 
    }
    else {
      this.inventoryreportService.showreport1(this.report1).subscribe((data) => {
        if (data[0] == 0) {
          this.Existe = 0;
          this.reportone = [];
          Swal.fire({icon: 'error', title: 'Ocurrio un error', text: 'No existe inventario en ese rango de fechas'})
        }
        else {
          this.Existe = 1;
          this.reportone = data[0];
        }
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      })
    }
  }
  ///Detalle
  mostrar(Date1, Date2, ProductId, total) {
    this.report2.Date1 = Date1;
    this.report2.Date2 = Date2;
    this.report2.ProductId = ProductId;
    this.inventoryreport2Service.showreport2(this.report2).subscribe((data) => {
      this.detail = data[0];
      this.cont = this.detail.length;
    })
    this.Total = total;
  }

}
