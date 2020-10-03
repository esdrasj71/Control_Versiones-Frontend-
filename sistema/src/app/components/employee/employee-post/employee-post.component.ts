import { Component, OnInit } from '@angular/core';
import {Employee } from '../interfaces/employee';
import {EmployeeService} from '../servicios/employee.service';
import { HttpClient } from '@angular/common/http';
import { EmployeePosition } from '../../employee_position/interfaces/employee-position';

@Component({
  selector: 'app-employee-post',
  templateUrl: './employee-post.component.html',
  styleUrls: ['./employee-post.component.css']
})
export class EmployeePostComponent implements OnInit {

  employee: Employee ={
    DPI: null,
    Names: null,
    Last_names: null,
    Phone_number: null,
    Cellphone_number: null,
    Email: null,
    Gender: null,
    Hire_date: null,
    Employee_Position_Id: null,
  }
  API_ENDPOINT = 'http://localhost:3000/';
  employeePosition: EmployeePosition[];
  constructor(private employeeService: EmployeeService, private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'employee_position')
    .subscribe((data: EmployeePosition[]) =>{
      this.employeePosition = data;
      console.log(this.employeePosition);
    })
   } 

  ngOnInit(): void {
  }
  saveEmployee(){
    console.log(this.employee);
    this.employeeService.save(this.employee).subscribe((data)=>{
      alert('Empleado guardada');
      console.log(data)
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    })
  }
}
 