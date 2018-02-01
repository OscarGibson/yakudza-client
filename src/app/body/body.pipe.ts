import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'phoneFormat'})
export class PhoneFormatPipe implements PipeTransform {
  transform(phone: string): string {
  	phone = phone.toString();
    return '+'+phone.substr(0,1)+' ('+phone.substr(2,3)+') '+phone.substr(5,2)+' '+phone.substr(7,2)+' '+phone.substr(9,3);
  }
}