import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { NotificationService } from './../../services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from 'src/app/services/users.service';

import { User, Session } from 'src/app/models';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
  currentUser: User;
  users$: Observable<User[]>;
  session$: Observable<Session>;

  constructor(
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.session$ = this.sessionService.getSessionData();
    this.geUserInfo();
  }

  private geUserInfo() {
    this.userService.getCurrentUser()
      .pipe(take(1))
      .subscribe((user: User) => {
        this.currentUser = user;

        if (this.currentUser) {
          this.notificationService.show(`Hi, ${this.currentUser.name}!`);
        }
      });
  }

}
