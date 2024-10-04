import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponential',
  standalone: true
})
export class ExponentialPipe implements PipeTransform {

  transform(value: number, exp: number): number {
    return value ** exp;
  }

}
