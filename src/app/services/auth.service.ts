import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, from, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { auth } from 'firebase/app';
import { SessionService } from './session.service';
import { UsersService } from './users.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: firebase.auth.UserCredential;
  private signUp = new Subject<void>();

  user: firebase.User;
  signUp$ = this.signUp.asObservable();

  constructor(
    private afauth: AngularFireAuth,
    private sessionService: SessionService,
    private userService: UsersService
  ) {
    this.getUserData()
      .subscribe((user: firebase.User) => {
        console.log('user', user);
        this.user = user;
    });
  }

  loginWithGoogle(sessionId: string, isAdmin: boolean): Observable<User> {
    // login to the system using google authentication
    return from(this.afauth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        this.authState = userCredential;
        // save user and session id to database
        const { displayName, email, photoURL } = userCredential.user;
        return this.userService.updateCurrentUser({
          name: displayName, email, photoURL, sessionId, isAdmin, removedByAdmin: false
        });
      }));
  }

  logout(): Observable<void> {
    this.sessionService.clearSessionId();

    return this.getUserData()
      .pipe(
        switchMap((user: firebase.User) => {
          return this.userService.updateCurrentUser({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
        }),
        switchMap(() => this.afauth.auth.signOut()
      )
    );
  }

  getUserData(): Observable<firebase.User> {
    return this.afauth.authState;
  }

  dispatchSignUp() {
    this.signUp.next();
  }
}
