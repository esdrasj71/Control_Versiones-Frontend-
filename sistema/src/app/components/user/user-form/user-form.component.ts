import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interface/user';
import { UserService } from '../servicios/user.service'; 
import Swal from 'sweetalert2';
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
  date = new Date();
  constructor(private userService: UserService) {}

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
}
