import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService} from '../components/login/servicios/login.service'
@Injectable({
  providedIn: 'root'
})
export class CheckloginGuard implements CanActivate {
  bandera='';
  constructor(private log:LoginService){ 
    this.bandera=localStorage.getItem('canact');
    //app.usuario=localStorage.getItem('usuario');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.bandera=='true'){
      this.log.checkToken();
      if(localStorage.getItem('token')!==null){
        return true}
      else{
        alert('SESION EXPIRADA, VUELVA A INICIAR SESION');
        window.location.reload();
        return false;
      }
    }else
    {
      return false;
    }
      

    
  }
  
}
