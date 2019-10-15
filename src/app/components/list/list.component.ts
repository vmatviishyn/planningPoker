import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { TickectsService } from 'src/app/services/tickects.service';
import { SessionService } from './../../services/session.service';

import { Ticket, User } from 'src/app/models';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { TextfieldPopupComponent } from './textfield-popup/textfield-popup.component';
import DocumentReference = firebase.firestore.DocumentReference;
import randomize from 'randomatic';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  currentUser$: Observable<User>;
  ticket = '';
  tickets$: Observable<Ticket[]>;

  constructor(
    private userService: UsersService,
    private ticketsService: TickectsService,
    private sessionService: SessionService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.currentUser$ = this.userService.getCurrentUser();
    this.tickets$ = this.ticketsService.getTickets();
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

  private sendTicket(name: string): Promise<DocumentReference> {
    return this.ticketsService.addTicket({
      sessionId: this.sessionService.getSessionId(),
      ticketId: randomize('Aa0', 20),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      title: name,
      voted: false
    });
  }

}
