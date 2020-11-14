import { Component, OnInit } from '@angular/core';
import { EmployeePositionService } from '../servicios/employee-position.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeePosition } from '../interfaces/employee-position';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-position-form',
  templateUrl: './employee-position-form.component.html',
  styleUrls: ['./employee-position-form.component.css']
})
export class EmployeePositionFormComponent implements OnInit {

  employeePosition: EmployeePosition = {
    Employee_Position_Id: null,
    Name: null,
    Description: null,
  }; //este arreglo define los campos que se van a ingresar en el formulario
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; //Este campo ayuda a saber cuando estamos editando y cuando estamos ingresando
  postarr: EmployeePosition[]; //Este campo nos ayudara a traer los datos cuando queremos editar
  constructor(private employeePositionServicie: EmployeePositionService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.id = this.activatedRoute.snapshot.params['id']; //Este es el parametro que se definio en la ruta de app.module.ts
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'employee_position', { headers }).subscribe((data: EmployeePosition[]) => {
        this.postarr = data;
        console.log(this.postarr);
        this.employeePosition = this.postarr.find((m) => { return m.Employee_Position_Id == this.id }); //Aqui traemos solo el id que nos interesa
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
  }
  ngOnInit() {
  }
  savePost() {
    if (this.editing) {
      this.employeePositionServicie.put(this.employeePosition).subscribe((data) => { //El unico cambioes el put
        Swal.fire('Posición empleado actualizado', '', 'success');
        //console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
      });
    }
    else {
      if (this.employeePosition.Name == null) {
        Swal.fire({ icon: 'warning', title: 'Aviso!', text: 'Debe ingresar un nombre' });
      }
      else {
        this.employeePositionServicie.save(this.employeePosition).subscribe((data) => {
          Swal.fire('Posición empleado guardado', '', 'success');
          //console.log(data)
        }, (error) => {
          //console.log(error);
          Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
        });
      }
    }
  }
}
