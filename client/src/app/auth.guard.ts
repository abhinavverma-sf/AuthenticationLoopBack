import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }*/

  constructor(private authService: AuthService, private router: Router){

  }

  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }
    else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
