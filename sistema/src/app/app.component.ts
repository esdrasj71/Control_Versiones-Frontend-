import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from './components/login/servicios/login.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  title = 'sistema';
  isLog=true;
  usuario="";
constructor(private router: Router,
  private loginService:LoginService){
    
    setInterval(() => {
      this.mostrar(); 
    }, 1500);
   }
ngOnInit(){}
mostrar()
{
   this.usuario=localStorage.getItem('usuario');
}
  OnMostrar(a)
  {
    if(a=='Logueado')
    {
      this.isLog=true;
      this.router.navigate(['/#']);
    }
    else this.isLog=false;
  }
  logout()
  {

    this.loginService.logout();
    window.location.reload();
  }
}