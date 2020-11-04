import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterExpenditures'
})
export class FilterExpendituresPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const result_expenditures = [];
    for(const expenditures of value){
      if(expenditures.Date.toLowerCase().indexOf(arg.toLowerCase())>-1){
        result_expenditures.push(expenditures);
      }
    }
    return result_expenditures;
  }
}
