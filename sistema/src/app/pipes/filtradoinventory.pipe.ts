import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtradoinventory'
})
export class FiltradoinventoryPipe implements PipeTransform {
  transform(value: any, arg:any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_inventory =[];
    for(const inv of value){
      if(inv.Correlative_Product.indexOf(arg)> -1 || inv.ProductComplete.toLowerCase().indexOf(arg.toLowerCase())> -1)
      {
        console.log(arg);
        console.log(inv);
  
        resultado_inventory.push(inv);
      }
    }
    console.log(resultado_inventory);
    return resultado_inventory;
  }
}
