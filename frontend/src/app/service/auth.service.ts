import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  setUserAccountId(userAccountId: string) {
    sessionStorage.setItem('userAccountId', userAccountId);
  }

  getUserAccountId(): string {
    return sessionStorage.getItem('userAccountId');
  }


  setUserId(userId: string) {
    sessionStorage.setItem('userId', userId);
  }

  getUserId(): string {
    return sessionStorage.getItem('userId');
  }

  setUserRole(role: string) {
    sessionStorage.setItem('userRole', role);
  }

  getUserRole(): string {
    return sessionStorage.getItem('userRole');
  }


  setSessionUserId(userId: string) {
    sessionStorage.setItem('sessionUserId', userId);
  }

  getSessionUserId(): string {
    return sessionStorage.getItem('sessionUserId');
  }

}
