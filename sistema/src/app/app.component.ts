import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from './components/login/servicios/login.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  Existe=0;
  rol='1';
  title = 'sistema';
  isLog=true;
  usuario="";
constructor(private router: Router,
  private loginService:LoginService
  ){
    if(this.loginService.checklogin)
      this.router.navigate(['/home']);
      setInterval(() => {
       this.mostrar(); 
     }, 2000);
  }
   
ngOnInit(){}
mostrar()
{
   this.usuario=localStorage.getItem('usuario');
   this.rol=localStorage.getItem('Rol');
   if(this.usuario==null)
    this.Existe=0;
    else
      this.Existe=1;
}
  logout()
  {

    this.loginService.logout();
    window.location.reload();
  }
}