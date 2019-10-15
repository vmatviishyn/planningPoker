import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private matSnackBar: MatSnackBar) { }

  show(msg: string, buttonName = 'Close') {
    this.matSnackBar.open(msg, buttonName, { duration: 3000, panelClass: ['snack-bar'] });
  }

  showError(msg: string, buttonName = 'Close') {
    this.matSnackBar.open(msg, buttonName, { duration: 3000, panelClass: ['snack-bar--error'] });
  }
}
