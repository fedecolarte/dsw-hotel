import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, concatMap, map, mergeMap, take } from 'rxjs';
import { StoreService } from './core/services/store.service';
import { UserService } from './core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.isLogged$.pipe(map((isLogged) => {
      if(isLogged)  return true;
      else  return this.router.parseUrl('');
    }))
  }
}
