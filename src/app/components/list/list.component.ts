import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { TickectsService } from 'src/app/services/tickects.service';
import { SessionService } from './../../services/session.service';

import { Ticket, User } from 'src/app/models';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  currentUser$: Observable<User[]>;
  ticket = '';
  tickets$: Observable<Ticket[]>;

  constructor(
    private userService: UsersService,
    private ticketsService: TickectsService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.currentUser$ = this.userService.getCurrentUser();
    this.tickets$ = this.ticketsService.getTickets(this.sessionService.getSessionId());
  }

  onAddTicket() {
    this.ticketsService.addTicket({
      title: this.ticket,
      sessionId: this.sessionService.getSessionId(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      this.ticket = '';
    });
  }

}
