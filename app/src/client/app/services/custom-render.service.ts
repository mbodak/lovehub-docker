import { ElementRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class CustomRenderService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public invokeElementMethod(eleRef: ElementRef, method: string) {
    if (isPlatformBrowser(this.platformId)) {
      eleRef.nativeElement[method]();
    }
  }
}
