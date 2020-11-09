import { Component, OnInit } from '@angular/core';
import { BankService } from '../servicios/bank.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bank } from '../interfaces/bank';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bank-home',
  templateUrl: './bank-home.component.html',
  styleUrls: ['./bank-home.component.css']
})
export class BankHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  bank: Bank[];
  constructor(private bankService: BankService, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'bank', { headers })
      .subscribe((data: Bank[]) => {
        this.bank = data;
      })
  }
  searchTermBank = '';
  ngOnInit(): void {
  }
  delete(id) {
    this.bankService.delete(id).subscribe(
      (data) => {
        Swal.fire('Banco Eliminado', '','success');
      },
      (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      }
    );
  }
}
