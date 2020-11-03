import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBank'
})
export class FilterBankPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_bank= [];
    for(const bank of value){
      if(bank.Bank_Name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultado_bank.push(bank);
      }
    }
    return resultado_bank;
  }

}
