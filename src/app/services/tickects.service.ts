import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';

import { SessionService } from './session.service';
import { Ticket } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TickectsService {
  constructor(private afs: AngularFirestore, private sessionService: SessionService) {}

  getTickets() {
    return this.afs.collection('tickets', (ref: firebase.firestore.CollectionReference) => ref
      .where('sessionId', '==', this.sessionService.getSessionId())
      .orderBy('timestamp'))
      .valueChanges();
  }

  addTicket(ticket: Ticket) {
    return this.afs.collection('tickets').add(ticket);
  }
}
