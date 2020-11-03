import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterExpense'
})
export class FilterExpensePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_gasto= [];
    for(const gasto of value){
      if(gasto.Name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultado_gasto.push(gasto);
      }
    }
    return resultado_gasto;
  }
}
