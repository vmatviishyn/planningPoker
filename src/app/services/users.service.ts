import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { SessionService } from 'src/app/services/session.service';
import { documentId, FirebaseUser, FirestoreCollectionReference, FirestoreQuerySnapshot, User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private sessionService: SessionService
  ) {}

  updateCurrentUser(user: User): Observable<User> {
    return this.afauth.authState
      .pipe(
        // create new user or update existing with new session id
        switchMap((userData: FirebaseUser) => of(this.afs.doc(`users/${userData.uid}`).set(user))),
        switchMap(() => of(user)),
      );
  }

  getUsers(): Observable<User[]> {
    return this.afs.collection('users', (ref: FirestoreCollectionReference) => ref
      .where('sessionId', '==', this.sessionService.getSessionId()))
      .valueChanges();
  }

  getCurrentUser(): Observable<User> {
    return this.afauth.authState
    .pipe(
      switchMap((userData: FirebaseUser) => {
        if (!userData) { return of(null); }
        return this.afs
          .collection('users', (ref: FirestoreCollectionReference) => ref
          .where(documentId(), '==', userData.uid))
          .valueChanges();
      }),
      map((users: User[]) => users && users[0] || null)
    );
  }

  updateVotes(value: string, sessionId: string, userUid: string, voted: boolean) {
    return this.afs.collection('users', (ref: FirestoreCollectionReference) => ref
      .where('sessionId', '==', sessionId)).get()
      .pipe(switchMap(() => {
        return of(this.afs.doc(`users/${userUid}`).update({ vote: value, voted }));
      }));
  }

  updateUser(user: User): Observable<void> {
    return this.afs.collection('users', (ref: FirestoreCollectionReference) => ref
      .where('email', '==', user.email)).get()
      .pipe(switchMap((snapshot: FirestoreQuerySnapshot) => {
        return this.afs.doc(`users/${snapshot.docs[0].id}`).set(user);
      }));
  }
}
