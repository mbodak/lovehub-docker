import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toArray';

@Component({
  moduleId: module.id,
  selector: 'app-pager',
  templateUrl: 'pager.component.html',
  styleUrls: ['pager.component.scss']
})
export class PagerComponent implements OnChanges {

  @Input() itemsPerPage: number;
  @Input() countItems: number;
  @Input() currentPage: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: Observable<number[]>;
  pagesToShow: number = 3;
  totalPages: number;

  ngOnChanges(): void {
    this.getPages(this.itemsPerPage, this.countItems);
  }

  getPages(itemsPerPage: number, countItems: number) {
    this.totalPages = this.getTotalPages(countItems, itemsPerPage);
    this.pages = Observable.range(-this.pagesToShow, this.pagesToShow * 2 + 1)
      .map(offset => this.currentPage + offset)
      .filter(page => this.isValidPageNumber(page, this.totalPages))
      .toArray();
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  getTotalPages(countItems: number, itemsPerPage: number): number {
    return Math.ceil(Math.max(countItems, 1) / Math.max(itemsPerPage, 1));
  }

  selectPage(page: number, event) {
    this.cancelEvent(event);
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.pageChange.emit(page);
    }
  }

  cancelEvent(event) {
    event.preventDefault();
  }
}
