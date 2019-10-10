import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { SessionService } from './../../services/session.service';
import { UsersService } from 'src/app/services/users.service';

import { User } from 'src/app/models';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private userService: UsersService, private sessionService: SessionService) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers(this.sessionService.getSessionId());
  }

}
