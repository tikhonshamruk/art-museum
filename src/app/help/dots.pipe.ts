import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dotsPipe',
  standalone: true
})
export class DotsPipe implements PipeTransform {

  transform(text: string | null | undefined, maxLength: number = 22): string {
    if (!text) {
      return '';
    }

    if (text.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength) + '...';
  }

}
