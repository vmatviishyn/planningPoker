import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from 'src/app/models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  @Input() users: User[];
  @Input() showResults: boolean;
  @Output() userClick = new EventEmitter<User>();

  onUserClick(user: User) {
    this.userClick.emit(user);
  }

}
