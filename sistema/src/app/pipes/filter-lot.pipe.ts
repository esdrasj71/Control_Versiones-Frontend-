import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLot'
})
export class FilterLotPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_lote = [];
    for(const lot of value){
      if(lot.Complete.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultado_lote.push(lot);
      }
    }
    return resultado_lote;
  }
}
