import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../servicios/expenses.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expenses } from '../interfaces/expenses';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-expenses-home',
  templateUrl: './expenses-home.component.html',
  styleUrls: ['./expenses-home.component.css']
})
export class ExpensesHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  expenses: Expenses[];

  constructor(private expensesService: ExpensesService, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'expenses', { headers })
      .subscribe((data: Expenses[]) => {
        this.expenses = data;
      })
  }
  searchTermExpenses = '';
  ngOnInit(): void {
  }
  delete(id) {
    this.expensesService.delete(id).subscribe(
      (data) => {
        Swal.fire('Gasto Eliminado', '','success');
        window.setTimeout(function(){location.reload()},2000)
      },
      (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      }
    );
  }
}
