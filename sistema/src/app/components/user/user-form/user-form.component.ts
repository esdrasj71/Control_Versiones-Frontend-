import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interface/user';
import { UserService } from '../servicios/user.service'; 
import { Employee} from '../../employee/interfaces/employee'; 
import { EmployeeService } from '../../employee/servicios/employee.service';
import Swal from 'sweetalert2';
import { EmployeePositionService } from '../../employee_position/servicios/employee-position.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  user: User = {
    Username: null,
    Password: null,
    Date_Created: null,
    Usertype: null,
    Employee_Id: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  date = new Date();
  employee : Employee[];
  selectedEmployeeId : number;
  userarr: User[];

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, 
    private employeeService: EmployeeService) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });

    this.httpClient.get(this.API_ENDPOINT + 'employee', { headers })
      .subscribe((data: Employee[]) => {
        this.employee = data;
      });
      this.selectedEmployeeId = this.user.Employee_Id;
  }

  ngOnInit(): void {}
  saveUser() {
    let mes = this.date.getMonth() + 1;
    let fecha =
      mes.toString() +
      '/' +
      this.date.getDate() +
      '/' +
      this.date.getFullYear();
    this.user.Date_Created = new Date(fecha);
    this.user.Employee_Id = this.selectedEmployeeId;
    this.userService.save(this.user).subscribe(
      (data) => {
        Swal.fire('Usuario Creado', '','success');
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      }
    );
  }

  searchEmployee(filter: string, employee) {
    filter = filter.toLocaleLowerCase();
    return employee.Names.toLocaleLowerCase().indexOf(filter) > -1;
  }
}
