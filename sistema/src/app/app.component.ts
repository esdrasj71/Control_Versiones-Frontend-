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
  title = 'Quetzal Commerce';
  isLog=true;
  usuario="";
  interval:any;
  afuera:any;
constructor(private router: Router,
  private loginService:LoginService
  ){
    if(this.loginService.checklogin)
      this.router.navigate(['/home']);
      
    this.interval=setInterval(() => {
       this.mostrar(); 
     }, 2000);
  }
   
ngOnInit(){}
mostrar()
{
  console.log('entro');
  console.log(this.Existe);
  if(this.Existe==0)
  {
   this.usuario=localStorage.getItem('usuario');

   if(this.usuario==null){
    this.Existe=0;   console.log('0');
   }
    else
      {this.Existe=1;

        this.usuario=localStorage.getItem('usuario');
        this.rol=localStorage.getItem('Rol');
      }
  }else
  {
    clearInterval(this.interval);
    clearInterval(this.afuera);
  }
}
  logout()
  {

    this.loginService.logout();
    this.Existe=0;
    this.router.navigateByUrl('/home');
    this.router.navigate(['/login'])
    this.afuera=setInterval(() => {
      this.mostrar(); 
    }, 2000);
  }
}