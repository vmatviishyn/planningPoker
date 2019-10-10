import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afauth: AngularFireAuth, private router: Router, private activatedRoute: ActivatedRoute) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('"room" canActivate guard was called!');
    return from(this.afauth.authState).pipe(switchMap(data => {
      if (data) {
        return of(true);
      }

      this.redirectToHomePage();
      return of(false);
    }));
  }

  private redirectToHomePage() {
    this.router.navigate(['home']);
  }

}
