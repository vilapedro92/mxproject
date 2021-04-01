import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  value = '';
  @Output() toggleID = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  changeNumber(): void {
    setTimeout(() => {
      this.toggleID.emit(this.value);
    }, 500)
  }

}
