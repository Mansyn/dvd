import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'truncate', standalone: true})
export class TruncatePipe implements PipeTransform {
    constructor() {
    }

    transform(text: string, length: number = 20, suffix: string = '...'): string {

      if (text.length > length) {
        let truncated: string = text.substring(0, length).trim() + suffix;
        return truncated;
      }
  
      return text;
    }
}