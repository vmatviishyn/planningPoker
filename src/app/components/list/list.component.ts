import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  listItem = '';
  listArray = [
    { name: 'WR-23413' },
    { name: 'WR-23413' },
    { name: 'WR-23413' },
    { name: 'WR-23413' },
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    this.listArray.push({ name: this.listItem });
    this.listItem = '';
  }

}
