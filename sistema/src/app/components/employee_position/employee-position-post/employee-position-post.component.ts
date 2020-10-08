import { Component, OnInit } from '@angular/core';
import { EmployeePositionService } from '../servicios/employee-position.service';
import { HttpClient } from '@angular/common/http';
import { EmployeePosition } from '../interfaces/employee-position';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-position-post',
  templateUrl: './employee-position-post.component.html',
  styleUrls: ['./employee-position-post.component.css']
})
export class EmployeePositionPostComponent implements OnInit {

  employeePosition: EmployeePosition = {
    Employee_Position_Id:null,
    Name: null,
    Description: null,
  }; //este arreglo define los campos que se van a ingresar en el formulario
  API_ENDPOINT = 'http://localhost:3000/';
   
  ngOnInit(): void {
 }

 constructor(private employeeService: EmployeePositionService) {

 }

 savePosition(){
   console.log(this.employeePosition);
   this.employeeService.save(this.employeePosition).subscribe((data)=>{
     alert('Posicion del empleado guardada');
     console.log(data)
   },(error)=>{
     console.log(error);
     alert('Ocurrio un error');
   })
 }
}
