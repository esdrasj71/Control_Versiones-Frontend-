import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBrand'
})
export class FilterBrandPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const result_brand = [];
    for(const brand of value){
      if(brand.Name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        result_brand.push(brand);
      }
    }
    return result_brand;
  }
}
