import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { TickectsService } from 'src/app/services/tickects.service';
import { SessionService } from './../../services/session.service';
import { HashService } from './../../services/hash.service';

import { Ticket, User, Session } from 'src/app/models';
import { TextfieldPopupComponent } from './textfield-popup/textfield-popup.component';
import DocumentReference = firebase.firestore.DocumentReference;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() currentUser: User;

  ticket = '';
  tickets: Ticket[];
  session: Session;
  sessionSub: Subscription;
  ticketsSub: Subscription;

  constructor(
    private ticketsService: TickectsService,
    private sessionService: SessionService,
    private hashService: HashService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.ticketsSub = this.ticketsService.getTickets()
      .subscribe(data => {
        this.tickets = data;
      });

    this.sessionSub = this.sessionService.getSessionData()
      .subscribe(data => {
        this.session = data;
      });
  }

  ngOnDestroy() {
    this.sessionSub.unsubscribe();
    this.ticketsSub.unsubscribe();
  }

  onAddTicket(): void {
    this.sendTicket(this.ticket)
      .then(() => this.ticket = '');
  }

  addTicketsFromText(): void {
    this.dialog.open(TextfieldPopupComponent, {
      width: '70vw',
    }).afterClosed().subscribe(result => {
      if (result) {
        result.forEach(this.sendTicket.bind(this));
      }
    });
  }

  onDeleteTicket(ticket: Ticket) {
    this.ticketsService.deleteTicket(ticket)
      .pipe(take(1))
      .subscribe();
  }

  private sendTicket(name: string): Promise<DocumentReference> {
    return this.ticketsService.addTicket({
      sessionId: this.sessionService.getSessionId(),
      ticketId: this.hashService.generateHash(32),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      title: name,
      voted: false
    });
  }


}
