import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'innerHTML'
})
export class InnerHTMLPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value:any) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
