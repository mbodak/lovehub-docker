import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'multiline'
})
export class MultilinePipe implements PipeTransform{
    transform(text){
        return text.replace(new RegExp('\n', 'g'), "<br/>");
    }
}