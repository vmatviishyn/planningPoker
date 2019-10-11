import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less']
})
export class ShareComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openPopup(): void {
    const dialog = this.dialog.open(PopupComponent, {
      width: '80vh',
    });
  }

}
