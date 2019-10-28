import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent {
  link = window.location.href;

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }
}
