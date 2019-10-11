import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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

  checkSession(id: string): Observable<boolean> {
    return this.afs.collection('sessions', ref => ref.where('id', '==', id)).valueChanges()
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
    // @TODO: Replace with hash generator
    return Math.random().toString(36).substring(7);
  }

  removeOldSessions() {
    // @TODO: Implement this method with removing old sessions
    return this.afs.collection('sessions').valueChanges();
  }
}
