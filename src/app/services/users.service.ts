import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore, private afauth: AngularFireAuth) {}

  addUser(name: string, sessionId: string, isAdmin: boolean): Observable<User> {
    const user: User = { name, sessionId, isAdmin };

    return this.afauth.authState
      .pipe(
        // create new user or update existing with new session id
        switchMap((userData: firebase.User) => of(this.afs.doc(`users/${userData.uid}`).set(user))),
        switchMap(() => of(user)),
      );
  }

  getUsers(id: string) {
    return this.afs.collection('users', ref => ref.where('sessionId', '==', id)).valueChanges();
  }

  getCurrentUser(): Observable<User[]> {
    return this.afauth.authState
    .pipe(
      switchMap((userData: firebase.User) => {
        return this.afs
          .collection('users', ref => ref
          .where(firebase.firestore.FieldPath.documentId(), '==', userData.uid))
          .valueChanges();
      })
    );
  }
}
