import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { take } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { User } from './../../../models';
import { UsersService } from 'src/app/services';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User, currentUser: User },
    private dialogRef: MatDialogRef<UserDetailsComponent>,
    private userService: UsersService
  ) { }

  onRemoveFromSession(user: User) {
    this.userService.removeUserFromSession(user)
      .pipe(take(1))
      .subscribe(() => this.dialogRef.close());
  }

}
