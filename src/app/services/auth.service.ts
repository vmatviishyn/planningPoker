import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, from } from 'rxjs';
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
  public user: firebase.User;

  constructor(
    private afauth: AngularFireAuth,
    private sessionService: SessionService,
    private userService: UsersService
  ) {
    // For test purpose (user state)
    this.getUserData().subscribe((user: firebase.User) => {
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
        const { displayName, photoURL } = userCredential.user;
        return this.userService.updateUser(displayName, photoURL, sessionId, isAdmin);
      }));
  }

  logout(user: firebase.User): Observable<void> {
    this.sessionService.clearSessionId();

    // remove user from current session
    return this.userService.updateUser(user.displayName, user.photoURL, '', false)
      .pipe(
        // logout
        switchMap(() => from(this.afauth.auth.signOut()))
      );
  }

  getUserData(): Observable<firebase.User> {
    return this.afauth.authState;
  }
}
