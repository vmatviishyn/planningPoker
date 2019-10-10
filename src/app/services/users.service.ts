import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore) {}
  // this.users = this.afs.collection('users', ref => ref.where('sessionId', '==', 1000)).valueChanges();

  getUsers() {
    return this.afs.collection('users').valueChanges();
  }
}

interface User {
  id?: string;
  name?: string;
  sessionId?: number;
}


