import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8081";

  private guideUrl = "guide"
  private driverUrl = "driver"

  private touristUrl = "tourist"

  private registerUrl = "auth/signup"
  private deleteUrl = "auth"


  constructor(private httpClient: HttpClient) { }

  getAllGuides(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/${this.guideUrl}`)
  }

  getAllDrivers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/${this.driverUrl}`)
  }

  getGuideById(id: string): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${this.guideUrl}/${id}`)
  }


  getAllTourist(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/${this.touristUrl}`)

  }

  register(user:User): Observable<User[]>{
    return this.httpClient.post<User[]>(`${this.baseURL}/${this.registerUrl}`,user)

  }

  deleteUser(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${this.deleteUrl}/${id}`)
  }

}
