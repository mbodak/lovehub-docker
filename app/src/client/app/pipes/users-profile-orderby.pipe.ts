import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class UsersProfileOrderByPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return undefined;
  }
}
