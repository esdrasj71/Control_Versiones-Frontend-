import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../servicios/employee.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  employee: Employee[];
  constructor(
    private employeeService: EmployeeService,
    private httpClient: HttpClient
  ) {
    httpClient.get(this.API_ENDPOINT + 'employee')
      .subscribe((data: Employee[]) => {
        this.employee = data;
        console.log(this.employee);
      });
  }

  searchTerm = '';

  ngOnInit() { }
  delete(id) {
    this.employeeService.delete(id).subscribe(
      (data) => {
        alert('Empleado Eliminado');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
