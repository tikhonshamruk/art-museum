import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demensionsPipe',
  standalone: true
})
export class DemensionsPipe implements PipeTransform {

  transform(dimensions: string, dimensions_detail: any[]): string {
    if (!dimensions || !dimensions_detail || dimensions_detail.length === 0) {
      return '';
    }

    const detail = dimensions_detail[0];

    if (!detail.width || !detail.height) {
      return dimensions; // Return the original value, if no width or height
    }

    const widthCm = detail.width / 100;
    const heightCm = detail.height / 100;

    const widthIn = this.cmToFractionalInches(widthCm);
    const heightIn = this.cmToFractionalInches(heightCm);

    return `${widthIn} × ${heightIn} in. (${widthCm.toFixed(1)} × ${heightCm.toFixed(1)} cm)`;
  }

  private cmToFractionalInches(cm: number): string {
    const inches = cm / 2.54;
    const whole = Math.floor(inches);
    const fractional = inches - whole;

    let numerator = Math.round(fractional * 16); // To get the nearest 1/16 inch
    let denominator = 16;

    // Simplify the fraction
    for (let i = denominator; i > 1; i--) {
      if (numerator % i === 0 && denominator % i === 0) {
        numerator /= i;
        denominator /= i;
      }
    }

    if (numerator === 0) {
      return `${whole}`;
    } else if (numerator === denominator) {
      return `${whole + 1}`;
    } else {
      return `${whole} ${numerator}/${denominator}`;
    }
  }

}
