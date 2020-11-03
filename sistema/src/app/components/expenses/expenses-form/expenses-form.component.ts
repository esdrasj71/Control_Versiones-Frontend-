import { Component, OnInit } from '@angular/core';
import { Expenses } from '../interfaces/expenses';
import { ExpensesService } from '../servicios/expenses.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.css']
})
export class ExpensesFormComponent implements OnInit {
  expenses: Expenses = {
    Name: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false;
  expensesarr: Expenses[];
  constructor(private expensesService: ExpensesService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
  const headers = new HttpHeaders({ 'ContentType': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'expenses',{headers}).subscribe((data: Expenses[]) => {
        this.expensesarr = data;
        this.expenses = this.expensesarr.find((m) => { return m.Expenses_Id == this.id });
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
  }

  ngOnInit(): void {
  }
  saveExpenses() {
    if (this.editing) {
      this.expensesService.put(this.expenses).subscribe((data) => {
        Swal.fire('Gasto Actualizado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      });
    }
    else {
      this.expensesService.save(this.expenses).subscribe((data) => {
        Swal.fire('Gasto Guardado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      });
    }
  }
}
