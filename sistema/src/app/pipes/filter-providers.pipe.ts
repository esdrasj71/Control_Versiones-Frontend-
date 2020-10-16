import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProviders'
})
export class FilterProvidersPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length<3) return value;
    const result_provider = [];
    for(const provider of value){
      if(provider.Fiscal_Name.toLowerCase().indexOf(arg.toLowerCase())>-1 || provider.NIT.toLowerCase().indexOf(arg.toLowerCase())>-1){
        result_provider.push(provider);
      }
    }
    return result_provider;
  }
}
