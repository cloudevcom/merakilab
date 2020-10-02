import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serietype'
})
export class SerietypePipe implements PipeTransform {

  transform(value: any, args?: any): String {
   
    if(value == "Untested")
      return "Orgánic0";
    if(value == "synthetic")
      return "Sintético";
    if(value == "forecast")
      return "Estimado";
      if(value == "user")
      return "Personalizado";

      return "";
  }

}