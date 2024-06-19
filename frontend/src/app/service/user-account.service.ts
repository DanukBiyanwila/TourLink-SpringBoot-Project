import { Injectable } from '@angular/core';
import { UserAccount } from 'app/model/user-accunt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private baseURL = "http://localhost:8081"
  private authUrl = "auth/login"

  constructor(private httpClient: HttpClient) { }

  login(userAccount:UserAccount): Observable<UserAccount[]>{
    return this.httpClient.post<UserAccount[]>(`${this.baseURL}/${this.authUrl}`,userAccount)
  }
}
