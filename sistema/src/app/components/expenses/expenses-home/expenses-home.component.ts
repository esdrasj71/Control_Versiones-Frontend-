import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../servicios/expenses.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expenses } from '../interfaces/expenses';

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
        alert('Gasto Eliminado');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
