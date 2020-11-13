import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../servicios/employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeePosition } from '../../employee_position/interfaces/employee-position';
import Swal from 'sweetalert2';
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
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.employeeService.getEmployee().subscribe((data: Employee[]) => {
        this.postarr = data;
        console.log(this.postarr);
        this.employee = this.postarr.find((m) => { return m.Employee_Id == this.id });
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.httpClient.get(this.API_ENDPOINT + 'employee_position', { headers })
      .subscribe((data: EmployeePosition[]) => {
        this.employeePosition = data;
      })
  }
  ngOnInit() {
  }
  savePost() {
    if (this.editing) {
      this.employeeService.put(this.employee).subscribe((data) => { //El unico cambioes el put
        Swal.fire('Empleado Actualizado', '','success');
        //console.log(data)
      }, (error) => {
        //console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      });
    }
    else {
      if (this.employee.DPI == null || this.employee.Names == null || this.employee.Last_names == null || this.employee.Cellphone_number == null || this.employee.Gender== null || this.employee.Hire_date == null) {
        Swal.fire({ icon: 'warning', title: 'Aviso!', text: 'Debe llenar los campos obligatorios' }); 
      }
      else {
      this.employeeService.save(this.employee).subscribe((data) => {
        Swal.fire('Empleado Guardado', '','success');
        //console.log(data);
      }, (error) => {
        //console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
  }
  }
}
