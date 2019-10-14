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

  updateUser(name: string, photoURL: string, sessionId: string, isAdmin: boolean): Observable<User> {
    const user: User = { name, photoURL, sessionId, isAdmin };

    return this.afauth.authState
      .pipe(
        // create new user or update existing with new session id
        switchMap((userData: firebase.User) => of(this.afs.doc(`users/${userData.uid}`).set(user))),
        switchMap(() => of(user)),
      );
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
}
