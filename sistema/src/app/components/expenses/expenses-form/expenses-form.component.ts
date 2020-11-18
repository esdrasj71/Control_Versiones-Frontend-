import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Expenses } from '../interfaces/expenses';
import { ExpensesService } from '../servicios/expenses.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.css']
})
export class ExpensesFormComponent implements OnInit {
  @Output() Expenses_Id = new EventEmitter<number>();
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
      this.httpClient.get(this.API_ENDPOINT + 'expenses', { headers }).subscribe((data: Expenses[]) => {
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
  onSubmit(form: NgForm) {
    form.resetForm();
}
  saveExpenses() {
    if (this.editing) {
      this.expensesService.put(this.expenses).subscribe((data) => {
        Swal.fire('Gasto Actualizado', '', 'success');
        //console.log(data)
      }, (error) => {
        //console.log(error);
        Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' })
      });
    }
    else {
      if (this.expenses.Name == null) {
        Swal.fire({ icon: 'warning', title: 'Aviso!', text: 'Debe llenar todos los campos' });
      }
      else {
        this.expensesService.save(this.expenses).subscribe((data) => {
          Swal.fire('Gasto Guardado', '', 'success');
          //console.log(data)
          this.Expenses_Id.emit(data['id']);
        }, (error) => {
          //console.log(error);
          Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' })
        });
      }
    }
  }
}
