import { Component, OnInit } from '@angular/core';
import { Bank } from '../interfaces/bank';
import { BankService } from '../servicios/bank.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit {
  bank: Bank = {
    Bank_Name: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false;
  bankarr: Bank[];

  constructor(private bankService: BankService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'bank', { headers }).subscribe((data: Bank[]) => {
        this.bankarr = data;
        this.bank = this.bankarr.find((m) => { return m.Bank_Id == this.id });
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
  }
  ngOnInit(): void {
  }
  saveBank() {
    if (this.editing) {
      this.bankService.put(this.bank).subscribe((data) => {
        Swal.fire('Banco Actualizado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      });
    }
    else {
      this.bankService.save(this.bank).subscribe((data) => {
        Swal.fire('Banco Guardado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      });
    }
  }
}
