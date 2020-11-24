import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Configuration } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private configs = new Subject<Configuration>();
  configs$: Observable<Configuration> = this.configs.asObservable();

  constructor(private afs: AngularFirestore) {
    this.initConfigs();
  }

  private initConfigs(): void {
    const initialConfigs: Configuration = {
      theme: null,
    };

    this.afs.collection('configs').valueChanges()
      .pipe(
        map((configs: Configuration[]) => {
          !configs.length && this.afs.collection('configs').add(initialConfigs);
          return configs[0];
        })
      )
      .subscribe((configs: Configuration) => this.configs.next(configs));
  }
}
