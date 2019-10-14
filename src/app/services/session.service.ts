import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import randomize from 'randomatic';

import * as firebase from 'firebase/app';

import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionId: string;

  constructor(private afs: AngularFirestore) { }

  createSession(id: string) {
    return this.afs.collection('sessions').add({ id, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
      .then(() => this.sessionId = id);
  }

  getSessionData(): Observable<Session> {
    return this.afs.collection('sessions', (ref: firebase.firestore.CollectionReference) => ref
      .where('id', '==', this.getSessionId())).valueChanges()
      .pipe(map((sessions: Session[]) => sessions[0]));
  }

  updateValue(key: string, value: string) {
    return this.afs.collection('sessions', (ref: firebase.firestore.CollectionReference) => ref
      .where('id', '==', this.getSessionId())).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return of(this.afs.doc(`sessions/${snapshot.docs[0].id}`).update({ [key]: value }));
      }));
  }

  checkSession(id: string): Observable<boolean> {
    return this.afs.collection('sessions', (ref: firebase.firestore.CollectionReference) => ref.where('id', '==', id)).valueChanges()
      .pipe(switchMap((sessions: Session[]) => {
        return sessions.length ? of(true) : of(false);
      }));
  }

  // get query params from url
  // activateRoute is not working because of guard (it clears route snapshot)
  getParamValueQueryString(paramName: string) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  getSessionId() {
    return this.sessionId;
  }

  setSessionId() {
    this.sessionId = this.getParamValueQueryString('sessionId');
  }

  clearSessionId() {
    this.sessionId = '';
  }

  generateSession() {
    return randomize('Aa0', 16);
  }

  removeOldSessions() {
    // @TODO: Implement this method with removing old sessions
    return this.afs.collection('sessions').valueChanges();
  }
}
