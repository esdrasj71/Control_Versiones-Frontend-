import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BillType } from '../interfaces/bill-type';
import { BillTypeService } from '../servicios/bill-type.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bill-type-form',
  templateUrl: './bill-type-form.component.html',
  styleUrls: ['./bill-type-form.component.css']
})
export class BillTypeFormComponent implements OnInit {
  @Output() BillType_Id = new EventEmitter<number>();
  billtype: BillType = {
    Name: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false;
  billtypearr: BillType[];
  constructor(private billtypeService: BillTypeService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'billtype', { headers }).subscribe((data: BillType[]) => {
        this.billtypearr = data;
        this.billtype = this.billtypearr.find((m) => { return m.Bill_Type_Id == this.id });
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
   }
  ngOnInit(): void {
  }
  saveBillType() {
    if (this.editing) {
      this.billtypeService.put(this.billtype).subscribe((data) => {
        Swal.fire('Tipo de Factura Actualizado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      });
    }
    else {
      this.billtypeService.save(this.billtype).subscribe((data) => {
        Swal.fire('Tipo de Factura Guardado', '','success');
        console.log(data);
        this.BillType_Id.emit(data['id']);
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      });
    }
  }
}
