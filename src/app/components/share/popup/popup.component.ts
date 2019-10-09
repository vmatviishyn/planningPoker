import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent {
  value='http://localhost:4200/';

  constructor(public dialogRef: MatDialogRef<PopupComponent>,
                @Inject(MAT_DIALOG_DATA) public data) {
    console.log('AppComponent running');
  }

}
