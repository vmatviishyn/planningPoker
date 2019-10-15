import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';

import { SessionService } from './session.service';
import { Ticket, Card } from '../models';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private afs: AngularFirestore, private sessionService: SessionService) { }


  createVoteCollection(sessionId: string, ticketId: string) {
    return this.afs.collection('votes').add({ sessionId, ticketId });
  }

  vote(userId: string, card: Card, ticketId: string): any {
    return this.afs.collection('votes', (ref: firebase.firestore.CollectionReference) => ref
      .where('sessionId', '==', this.sessionService.getSessionId())
      .where('ticketId', '==', ticketId))
      .get()
      .pipe(
        switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
          return this.afs.doc(`votes/${snapshot.docs[0].id}`).collection('results').doc(userId).set(card);
        })
      );
  }
}