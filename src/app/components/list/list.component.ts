import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { TickectsService } from 'src/app/services/tickects.service';
import { SessionService } from './../../services/session.service';

import { Ticket } from 'src/app/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  ticket = '';
  tickets$: Observable<Ticket[]>;

  constructor(private ticketsService: TickectsService, private sessionService: SessionService) { }

  ngOnInit() {
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
