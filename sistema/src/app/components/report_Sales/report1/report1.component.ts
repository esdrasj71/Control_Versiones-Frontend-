import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {Report1Service} from '../servicios/report1.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Report2} from '../interfaces/report2';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css']
})
export class Report1Component implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  API_ENDPOINT = 'http://localhost:3000/';
  report2: Report2 = {
    fechainicio: null,
    fechafin: null,
  }
  repor1: Report2[];
  reportt1 = [];
  total_total = 0;
  constructor(private report1Service: Report1Service, private httpClient: HttpClient) { 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    httpClient.get(this.API_ENDPOINT + 'series',{headers}).subscribe((data: Report2[])=>{
      this.repor1 = data;
      //console.log(this.repor1);
    })
  }

  ngOnInit(): void {
  }
  saveReport1(){
    this.report1Service.getReport1(this.report2).subscribe((data)=>{
      this.reportt1 = [];
      this.repor1.forEach(e => {
        let temp = [];
        let total_Serie = 0;
        data[0].forEach(g => {
          if(e["Serie"] == g["Serie"]){
            temp.push(g);
            total_Serie += g["Total"];
          }
        });
        this.total_total += total_Serie;  
        temp.push(total_Serie);
        this.reportt1.push(temp);
      });
    }, (error)=>{
      console.log(error);
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
