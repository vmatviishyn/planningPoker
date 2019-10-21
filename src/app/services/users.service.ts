import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as firebase from 'firebase/app';

import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private sessionService: SessionService
  ) {}

  updateCurrentUser(name: string, email: string, photoURL: string, sessionId: string, isAdmin: boolean): Observable<User> {
    const user: User = { name, email, photoURL, sessionId, isAdmin, vote: null, voted: false };

    return this.afauth.authState
      .pipe(
        // create new user or update existing with new session id
        switchMap((userData: firebase.User) => of(this.afs.doc(`users/${userData.uid}`).set(user))),
        switchMap(() => of(user)),
      );
  }

  removeUserFromSession(user: User): Observable<void> {
    return this.afs.collection('users', (ref: firebase.firestore.CollectionReference) => ref
      .where('email', '==', user.email)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return this.afs.doc(`users/${snapshot.docs[0].id}`).update({ sessionId: null, isAdmin: false, vote: null, voted: false });
      }));
  }

  getUsers(): Observable<User[]> {
    return this.afs.collection('users', (ref: firebase.firestore.CollectionReference) => ref
      .where('sessionId', '==', this.sessionService.getSessionId())
      .orderBy('name'))
      .valueChanges();
  }

  getCurrentUser(): Observable<User> {
    return this.afauth.authState
    .pipe(
      switchMap((userData: firebase.User) => {
        if (!userData) { return of(null); }
        return this.afs
          .collection('users', (ref: firebase.firestore.CollectionReference) => ref
          .where(firebase.firestore.FieldPath.documentId(), '==', userData.uid))
          .valueChanges();
      }),
      map((users: User[]) => users && users[0] || null)
    );
  }

  updateVotes(value: string, sessionId: string, userUid: string, voted: boolean) {
    return this.afs.collection('users', (ref: firebase.firestore.CollectionReference) => ref
      .where('sessionId', '==', sessionId)).get()
      .pipe(switchMap(() => {
        return of(this.afs.doc(`users/${userUid}`).update({ vote: value, voted }));
      }));
  }
}
