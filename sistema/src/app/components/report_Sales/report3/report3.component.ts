import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Reports3Service} from '../servicios/reports3.service';
import {Report3} from '../interfaces/report3';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


@Component({
  selector: 'app-report3',
  templateUrl: './report3.component.html',
  styleUrls: ['./report3.component.css']
})
export class Report3Component implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  report3: Report3[];
  constructor(private report3Service: Reports3Service) { }

  ngOnInit(): void {
    this.report3Service.getReport3().subscribe((data: Report3[]) => {
      return this.report3 = data;
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
