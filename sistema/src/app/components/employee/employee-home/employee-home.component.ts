import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../servicios/employee.service';
import { Employee } from '../interfaces/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  employee: Employee[];
  constructor(private employeeService: EmployeeService, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'employee', { headers })
      .subscribe((data: Employee[]) => {
        this.employee = data;
      });
  }

  searchTerm = '';

  ngOnInit() { }
  delete(id) {
    this.employeeService.delete(id).subscribe(
      (data) => {
        Swal.fire('Empleado Eliminado', '','success');
      },
      (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      }
    );
  }
}
