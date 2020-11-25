import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Configuration, Theme } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private initialConfigs: Configuration = {
    theme: Theme.Default,
  };
  private configs = new BehaviorSubject<Configuration>(this.initialConfigs);
  configs$: Observable<Configuration> = this.configs.asObservable();

  constructor(private afs: AngularFirestore) {
    this.initConfigs();
  }

  private initConfigs(): void {
    this.afs.collection('configs').valueChanges()
      .pipe(
        map((configs: Configuration[]) => {
          !configs.length && this.afs.collection('configs').add(this.initialConfigs);
          return configs[0];
        })
      )
      .subscribe((configs: Configuration) => this.configs.next({ ...configs, loaded: true }));
  }
}
