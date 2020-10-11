import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmployeePos'
})
export class FilterEmployeePosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_employee_pos = [];
    for(const employee_pos of value){
      if(employee_pos.Name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultado_employee_pos.push(employee_pos);
      }
    }
    return resultado_employee_pos;
  }
}
