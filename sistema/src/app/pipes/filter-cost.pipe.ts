import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCost'
})
export class FilterCostPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_costo= [];
    for(const costo of value){
      if(costo.Name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultado_costo.push(costo);
      }
    }
    return resultado_costo;
  }

}
