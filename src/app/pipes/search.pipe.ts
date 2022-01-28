import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any[]|undefined, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase()
    
    return value.filter((data: any)=>JSON.stringify(data).toLocaleLowerCase().includes(args));
  }



}
