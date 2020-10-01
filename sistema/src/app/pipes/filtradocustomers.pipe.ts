import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtradocustomers'
})
export class FiltradocustomersPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const resultado_cliente = [];
    for(const cliente of value){
      if(cliente.Names.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultado_cliente.push(cliente);
      }
    }
    return resultado_cliente;
  }

}
