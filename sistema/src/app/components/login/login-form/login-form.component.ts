import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Login } from '../interface/login';
import { Router } from '@angular/router';
import {UserService} from '../../user/servicios/user.service';
import {User} from '../../user/interface/user'
import {Employee} from '../../employee/interfaces/employee'
import {EmployeeService} from '../../employee/servicios/employee.service'
import {EmployeePosition} from '../../employee_position/interfaces/employee-position'
import {EmployeePositionService} from '../../employee_position/servicios/employee-position.service'
import Swal from 'sweetalert2';
import { Company } from '../../home/interface/company';
import { CompanyService } from '../../home/servicios/company.service';
import {AppComponent} from '../../../app.component'
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Output() IsLogued = new EventEmitter<string>();
  date = new Date();
  Existe: number;
  API_ENDPOINT = 'http://localhost:3000/';
  company: Company = {
    Company_Id: null,
    Company_Name: null,
    Address: null,
    NIT: null,
  };
  user: User = {
    Username: null,
    Password: null,
    Date_Created: null,
    Usertype: 0,
    Employee_Id: null,
  };
  position: EmployeePosition = {
    Employee_Position_Id: null,
    Name: null,
    Description: null,
  };
  login: Login = {
    Username: null,
    Password: null,
    Token: null,
  };
  employee: Employee = {
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
  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private employeeService: EmployeeService,
    private employeepositionService: EmployeePositionService,
    private companyService: CompanyService,
    private appcomp:AppComponent
  ) {
    this.Existe = 0;
    this.userService.getUsers().subscribe(
      (data) => {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            this.Existe++;
          }
        }

        if (this.Existe > 0) localStorage.removeItem('token');
        else {
          localStorage.removeItem('token');
          localStorage.setItem('token', '0');
        }
        return this.Existe;
      },
      (error) => {
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
        //console.log(error);
      }
    );
  }

  ngOnInit() {}
  saveFirst() {
    if (
      this.employee.Cellphone_number == null || this.employee.Cellphone_number=="" ||
      this.employee.DPI == null || this.employee.DPI=="" ||
      this.employee.Gender == null ||
      this.employee.Hire_date == null ||
      this.employee.Last_names == null || this.employee.Last_names == "" ||
      this.employee.Names == null || this.employee.Names == ""||
      this.company.Company_Name == null || this.company.Company_Name == "" ||
      this.company.Address == null || this.company.Address == "" ||
      this.company.NIT == null || this.company.NIT == ""||
      this.user.Username == null || this.user.Username == "" ||
      this.user.Password == null || this.user.Password == "" 
     ) {
     
      Swal.fire({icon: 'warning', title: 'Precaución!', text: 'Algunos de los datos son incorrectos porfavor verifique haber llenado todos los campos'}); 
    } else {
      this.position.Name = 'Administrador';
      this.position.Description = 'Es el encargado del sistema y de la empresa';
      this.companyService.save(this.company).subscribe();
      this.employeepositionService.save(this.position).subscribe(
        (data) => {
          this.employee.Employee_Position_Id = data['id'];
          this.employeeService.save(this.employee).subscribe((ata) => {
            //alert('Empleado Guardado');
            this.user.Employee_Id = ata['id'];
            this.user.Usertype = 1;
            //console.log(this.user);
            this.userService.save(this.user).subscribe(
              (user) => {
                //console.log(user);
                Swal.fire('Usuario Creado', '','success');
                localStorage.removeItem('token');
                this.Existe=1;
                this.router.navigate(['/']);
                this.router.navigate(["/login"]);
              },
              (error) => {
                //console.log(error);
                Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
              }
            );
          });
        },
        (error) => {
          //console.log(error);
          Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
          localStorage.removeItem('token');
          //window.setTimeout(function(){location.reload()},1500)
        }
      );
    }
  }
  savePost() {
    if (this.login.Username == null || this.login.Username=="" || this.login.Password == null || this.login.Password=="") {
      Swal.fire({icon: 'warning', title: 'Precaución!', text: 'Introduzca un usuario y una contraseña'}); 
    } else {
      this.loginService.save(this.login).subscribe();
    }
  }
  logout() {
    this.loginService.logout();
  }
  onSubmit(form: NgForm) {
    form.resetForm();
}
}
