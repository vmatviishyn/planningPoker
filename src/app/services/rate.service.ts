import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore'
;
import { exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private afs: AngularFirestore) { }

  rate(uid: string): Observable<void> {
    return this.afs.collection('rates').doc(uid).valueChanges()
      .pipe(
        exhaustMap((data: any) => this.afs.collection('rates').doc(uid).set({count: data?.count > 0 ? 0 : 1 }))
      )
  }

  getRates(): Observable<DocumentData> {
    return this.afs.collection('rates').valueChanges();
  }
}
