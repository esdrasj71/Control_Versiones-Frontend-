import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtradouser'
})
export class FiltradouserPipe implements PipeTransform {

  transform(value: any, arg:any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_user =[];
    for(const user of value){
      if(user.Username.toLowerCase().indexOf(arg.toLowerCase())> -1)
      {
        resultado_user.push(user);
      }
    }
    return resultado_user;
  }
}
