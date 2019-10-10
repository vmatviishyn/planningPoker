import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore, private afauth: AngularFireAuth) {}

  addUser(name: string, sessionId: string): Observable<any> {
    const user = { name, sessionId };

    return this.afauth.authState
      .pipe(
        // create new user or update existing with new session id
        switchMap((userData) => of(this.afs.doc(`users/${userData.uid}`).set(user))),
        switchMap(() => of(user)),
      );
  }

  getUsers(id: string) {
    return this.afs.collection('users', ref => ref.where('sessionId', '==', id)).valueChanges();
  }
}
