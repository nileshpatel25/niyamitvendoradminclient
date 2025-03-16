import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN } from '../constants/constants';
import { StorageService } from '../services/storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _storage: StorageService) {}

  canActivate(): Observable<any> | Promise<any> | any {
    if (this._storage.getToken) {
      return new Observable((observer) => {
        if (this._storage.getToken) observer.next(true);
        else observer.next(false);
      });
    } else {
      const tree: UrlTree = this._router.parseUrl(LOGIN);
      return tree;
    }
  }
}
