import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent {
  link = window.location.href;

  constructor(public dialogRef: MatDialogRef<PopupComponent>,
                @Inject(MAT_DIALOG_DATA) public data) {
    console.log('AppComponent running');
  }
}
