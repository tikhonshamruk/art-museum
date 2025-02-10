import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe',
  standalone: true
})
export class RangeFormat implements PipeTransform {

  transform(data: { date_start: number, date_end: number }): string {
    const start = data.date_start;
    const end = data.date_end.toString().slice(-2); // Берем последние две цифры года
    return `${start}-${end}`;
  }

}
