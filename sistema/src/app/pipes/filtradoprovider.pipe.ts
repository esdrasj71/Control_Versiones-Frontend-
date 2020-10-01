import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtradoprovider'
})
export class FiltradoproviderPipe implements PipeTransform {

  transform(value: any, arg:any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_proveedor =[];
    for(const proveedor of value){
      if(proveedor.Fiscal_Name.toLowerCase().indexOf(arg.toLowerCase())> -1)
      {
        resultado_proveedor.push(proveedor);
      }
    }
    return resultado_proveedor;
  }

}
