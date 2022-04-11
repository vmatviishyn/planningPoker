import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentData } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

import { FirestoreCollectionReference, FirestoreQuerySnapshot, Vote } from './../models';

import { SessionService } from './session.service';
import { Card } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private afs: AngularFirestore, private sessionService: SessionService) { }

  createVoteCollection(sessionId: string, ticketId: string): Observable<DocumentReference> {
    return from(this.afs.collection('votes').add({ sessionId, ticketId }));
  }

  vote(userId: string, card: Card, ticketId: string): Observable<void> {
    return this.getVotesCollectionByTicketId(ticketId)
      .pipe(
        switchMap((snapshot: FirestoreQuerySnapshot) => {
          return this.afs.doc(`votes/${snapshot.docs[0].id}`).collection('results').doc(userId).set(card);
        })
      );
  }

  getResults(ticketId: string): Observable<DocumentData[]> {
    return this.getVotesCollectionByTicketId(ticketId)
      .pipe(
        switchMap((snapshot: FirestoreQuerySnapshot) => {
          return this.afs.doc(`votes/${snapshot.docs[0].id}`).collection('results').valueChanges();
        })
      );
  }

  getVoteByTicketId(ticketId: string): Observable<Vote> {
    return this.getVotesCollectionByTicketId(ticketId)
      .pipe(
        switchMap((snapshot: FirestoreQuerySnapshot) => {
          return this.afs.doc(`votes/${snapshot.docs[0].id}`).valueChanges();
        })
      );
  }

  resetVotes(ticketId: string): Observable<void> {
    return this.getVotesCollectionByTicketId(ticketId)
      .pipe(
        switchMap((snapshot: FirestoreQuerySnapshot) => {
          return this.afs.doc(`votes/${snapshot.docs[0].id}`).delete();
        })
      );
  }

  getVotesBySessionId(sessionId: string): Observable<Vote[]> {
    return this.afs.collection('votes', (ref: FirestoreCollectionReference) => ref
      .where('sessionId', '==', sessionId)).valueChanges();
  }

  updateValue(ticketId: string, key: string, value: boolean | number): Observable<void> {
    return this.getVotesCollectionByTicketId(ticketId)
      .pipe(
        switchMap((snapshot: FirestoreQuerySnapshot) => {
          return this.afs.doc(`votes/${snapshot.docs[0].id}`).update({ [key]: value });
        })
    );
  }

  private getVotesCollectionByTicketId(ticketId: string): Observable<FirestoreQuerySnapshot> {
    return this.afs.collection('votes', (ref: FirestoreCollectionReference) => ref
      .where('sessionId', '==', this.sessionService.getSessionId())
      .where('ticketId', '==', ticketId))
      .get();
  }
}
