import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as firebase from 'firebase/app';

import { SessionService } from './session.service';
import { Ticket } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TickectsService {
  constructor(private afs: AngularFirestore, private sessionService: SessionService) {}

  addTicket(ticket: Ticket) {
    return this.afs.collection('tickets').add(ticket);
  }

  getTickets(): Observable<Ticket[]> {
    return this.afs.collection('tickets', (ref: firebase.firestore.CollectionReference) => ref
      .where('sessionId', '==', this.sessionService.getSessionId())
      .where('voted', '==', false)
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
}
