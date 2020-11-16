import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Session } from '../models/session.model';
import { FirestoreCollectionReference, FirestoreQuerySnapshot, serverTimestamp } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionId: string;

  constructor(private afs: AngularFirestore) { }

  createSession(id: string) {
    return this.afs.collection('sessions').add({ id, timestamp: serverTimestamp() })
      .then(() => this.sessionId = id);
  }

  getSessionData(): Observable<Session> {
    if (!this.sessionId) { return of(null); }
    return this.afs.collection('sessions', (ref: FirestoreCollectionReference) => ref
      .where('id', '==', this.getSessionId())).valueChanges()
      .pipe(map((sessions: Session[]) => sessions[0]));
  }

  updateValue(key: string, value: string) {
    return this.afs.collection('sessions', (ref: FirestoreCollectionReference) => ref
      .where('id', '==', this.getSessionId())).get()
      .pipe(switchMap((snapshot: FirestoreQuerySnapshot) => {
        return of(this.afs.doc(`sessions/${snapshot.docs[0].id}`).update({ [key]: value }));
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
}
