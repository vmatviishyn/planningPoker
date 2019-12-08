import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as firebase from 'firebase/app';

import { SessionService } from './session.service';
import { Ticket } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  constructor(private afs: AngularFirestore, private sessionService: SessionService) {}

  addTicket(ticket: Ticket): Observable<DocumentReference> {
    return from(this.afs.collection('tickets').add(ticket));
  }

  getTickets(sessionId = this.sessionService.getSessionId()): Observable<Ticket[]> {
    return this.afs.collection('tickets', (ref: firebase.firestore.CollectionReference) => ref
      .where('sessionId', '==', sessionId)
      .orderBy('timestamp'))
      .valueChanges();
  }

  getFirst(): Observable<Ticket> {
    return this.afs.collection('tickets', (ref: firebase.firestore.CollectionReference) => ref
      .where('sessionId', '==', this.sessionService.getSessionId())
      .where('voted', '==', false)
      .orderBy('timestamp')
      .limit(1))
      .valueChanges()
      .pipe(map((tickets: Ticket[]) => tickets[0]));
  }

  getTicketById(ticketId: string): Observable<Ticket> {
    return this.afs.collection('tickets', (ref: firebase.firestore.CollectionReference) => ref
      .where('sessionId', '==', this.sessionService.getSessionId())
      .where('voted', '==', false)
      .where('ticketId', '==', ticketId))
      .valueChanges()
      .pipe(map((tickets: Ticket[]) => tickets[0]));
  }

  updateValue(key: string, value: boolean, ticketId: string) {
    return this.afs.collection('tickets', (ref: firebase.firestore.CollectionReference) => ref
      .where('ticketId', '==', ticketId)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return of(this.afs.doc(`tickets/${snapshot.docs[0].id}`).update({ [key]: value }));
      }));
  }

  removeTicket(ticket: Ticket) {
    return this.afs.collection('tickets', (ref: firebase.firestore.CollectionReference) => ref
      .where('ticketId', '==', ticket.ticketId)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return of(this.afs.doc(`tickets/${snapshot.docs[0].id}`).delete());
      }));
  }
}
