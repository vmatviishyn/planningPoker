import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareComponent {

  constructor(public dialog: MatDialog) { }

  openPopup(): void {
    this.dialog.open(PopupComponent, {
      width: '80vh',
      panelClass: 'full-container'
    });
  }

}
