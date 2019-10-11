import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { auth } from 'firebase/app';
import { UsersService } from './users.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: firebase.auth.UserCredential;

  constructor(private afauth: AngularFireAuth, private userService: UsersService) {
    // For test purpose (user state)
    this.afauth.authState.subscribe((user: firebase.User) => {
      console.log('user', user);
    });
  }

  loginWithGoogle(sessionId: string, isAdmin: boolean): Observable<User> {
    // login to the system using google authentication
    return from(this.afauth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        this.authState = userCredential;
        // save user and session id to database
        const { displayName, photoURL } = userCredential.user;
        return this.userService.addUser(displayName, photoURL, sessionId, isAdmin);
      }));
  }

  // For test purpose
  logout() {
    this.afauth.auth.signOut();
  }
}
