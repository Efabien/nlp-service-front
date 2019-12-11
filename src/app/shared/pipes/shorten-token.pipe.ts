import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenToken'
})
export class ShortenTokenPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (!value) return 'Keep your token else where, it\'s not persisted in any form.';
    return value.slice(0, 50) + '...';
  }

}
