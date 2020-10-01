import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtradopresentation'
})
export class FiltradopresentationPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultado_presentation = [];
    for (const presentation of value) {
      if (presentation.Presentation.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultado_presentation.push(presentation);
      }
    }
    return resultado_presentation;
  }
}
