import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { UserService } from '../servicios/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  searchUser = '';
  API_ENDPOINT = 'http://localhost:3000/';
  user: User[];
  constructor(private userService: UserService) { 
    this.userService.getUsers().subscribe((data: User[]) => {
      this.user = data;
    });
  }

  ngOnInit(): void {
  }

  delete(id) {
    this.userService.delete(id).subscribe(
      (data) => {
        Swal.fire('Usuario Eliminado', '','success');
        //window.setTimeout(function(){location.reload()},1500)
      },
      (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      }
    );
  }
}
