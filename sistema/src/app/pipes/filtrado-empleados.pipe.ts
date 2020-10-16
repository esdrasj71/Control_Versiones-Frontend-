import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtradoEmpleados'
})
export class FiltradoEmpleadosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_employee = [];
    for(const employee of value){
      if(employee.Names.toLowerCase().indexOf(arg.toLowerCase())>-1 || employee.DPI.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultado_employee.push(employee);
      }
    }
    return resultado_employee;
  }
 
}
