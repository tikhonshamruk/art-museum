import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlPipe',
  standalone: true
})
export class UrlPipePipe implements PipeTransform {

  transform(imageId: string | null | undefined): string | null{
    const iiifUrl = 'https://www.artic.edu/iiif/2';
    if (!imageId) {
      return null; 
    }

    return `${iiifUrl}/${imageId}/full/843,/0/default.jpg`;
  }
}
