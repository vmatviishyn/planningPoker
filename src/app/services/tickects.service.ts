import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Ticket } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TickectsService {
  constructor(private afs: AngularFirestore) {}

  getTickets(id: string) {
    // @TODO: Add .orderBy('timestamp')
    return this.afs.collection('tickets', ref => ref.where('sessionId', '==', id)).valueChanges();
  }

  addTicket(ticket: Ticket) {
    return this.afs.collection('tickets').add(ticket);
  }
}
