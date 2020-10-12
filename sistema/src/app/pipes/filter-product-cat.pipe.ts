import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProductCat'
})
export class FilterProductCatPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_category = [];
    for(const category of value){
      if(category.Name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultado_category.push(category);
      }
    }
    return resultado_category;
  }
}
