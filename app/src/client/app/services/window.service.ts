import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

function _window(): any {
   return window;
}

@Injectable()
export class WindowService {
    private _headerHeight = 0;
    private _footerHeight = 0;
    private _freeHeight = 0;

    constructor(){}

    set headerHeight(height){
        this._headerHeight = height;
    }

    set footerHeight(height){
        this._footerHeight = height;
    }

    get freeHeight(){
        return  window.innerHeight - this._headerHeight;
    }

    get videoHeight(): any{
        return window.innerHeight - this._headerHeight;
    }
}
