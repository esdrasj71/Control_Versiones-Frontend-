import { Component, OnInit } from '@angular/core';
import { BillTypeService } from '../servicios/bill-type.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BillType } from '../interfaces/bill-type';

@Component({
  selector: 'app-bill-type-home',
  templateUrl: './bill-type-home.component.html',
  styleUrls: ['./bill-type-home.component.css']
})
export class BillTypeHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  billtype: BillType[];
  constructor(private billtypeService: BillTypeService, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'billtype', { headers })
      .subscribe((data: BillType[]) => {
        this.billtype = data;
      })
  }
  searchTermBillType = '';
  ngOnInit(): void {
  }
  delete(id) {
    this.billtypeService.delete(id).subscribe(
      (data) => {
        alert('Tipo de Factura Eliminado');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
