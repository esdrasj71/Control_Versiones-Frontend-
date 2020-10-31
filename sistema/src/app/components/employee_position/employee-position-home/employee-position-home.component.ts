import { Component, OnInit } from '@angular/core';
import { EmployeePositionService } from '../servicios/employee-position.service';
import { HttpClient} from '@angular/common/http';
import { EmployeePosition } from '../interfaces/employee-position';
import { Router} from '@angular/router';

@Component({
  selector: 'app-employee-position-home',
  templateUrl: './employee-position-home.component.html',
  styleUrls: ['./employee-position-home.component.css']
})
export class EmployeePositionHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  employeePosition: EmployeePosition[];

  constructor(
    private employeePositionService: EmployeePositionService, private router: Router,
    private httpClient: HttpClient
  ) {
    this.employeePositionService.getPosition()
    .subscribe((data: EmployeePosition[]) => {
      this.employeePosition = data; 
      console.log(this.employeePosition);
    });
}

searchTerm2 = '';

  ngOnInit() { this.employeePosition} 
  delete(id) {
    this.employeePositionService.delete(id).subscribe(
      (data) => {
        alert('Posicion de Empleado Eliminado');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
 