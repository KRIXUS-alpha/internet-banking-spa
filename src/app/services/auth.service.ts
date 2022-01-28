import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private userService:UserService) { }
  canActivate(): boolean {
    if (this.userService.currentUser == null) return false;
    else return true;

  }
}
