import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(
    private readonly router: Router,
  ) { }

  canActivate() {
    if (sessionStorage.getItem('token'))
      return true;

    this.router.navigate(['/login']);
    return false;
  }

}
