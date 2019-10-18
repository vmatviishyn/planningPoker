import { Injectable } from '@angular/core';
import randomize from 'randomatic';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  generateHash(length = 16) {
    return randomize('Aa0', length);
  }

}
