import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBillType'
})
export class FilterBillTypePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_billType= [];
    for(const type of value){
      if(type.Name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultado_billType.push(type);
      }
    }
    return resultado_billType;
  }

}
