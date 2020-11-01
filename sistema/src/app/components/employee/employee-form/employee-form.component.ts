import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../servicios/employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeePosition } from '../../employee_position/interfaces/employee-position';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = {
    Employee_Id: null,
    DPI: null,
    Names: null,
    Last_names: null,
    Phone_number: null,
    Cellphone_number: null,
    Email: null,
    Gender: null,
    Hire_date: null,
    Employee_Position_Id: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; 
  postarr: Employee[]; 
  employeePosition: EmployeePosition[];

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; //Este es el parametro que se definio en la ruta de app.module.ts
    if (this.id) {
      this.editing = true;
      this.employeeService.getEmployee().subscribe((data: Employee[]) => { //Aqui traemos el arreglo completo de datos
        this.postarr = data;
        console.log(this.postarr);
        this.employee = this.postarr.find((m) => { return m.Employee_Id == this.id }); //Aqui traemos solo el id que nos interesa
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'accesstoken':localStorage.getItem('token')});
    this.httpClient.get(this.API_ENDPOINT + 'employee_position', {headers})
      .subscribe((data: EmployeePosition[]) => {
        this.employeePosition = data;
        console.log(this.employeePosition);
      })
  }
  ngOnInit() {
  }
  savePost() {
    if (this.editing) {
      this.employeeService.put(this.employee).subscribe((data) => { //El unico cambioes el put
        alert('Empleado actualizado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
    else {
      console.log(this.employee);
      this.employeeService.save(this.employee).subscribe((data) => {
        alert('Empleado guardado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
  }
}
