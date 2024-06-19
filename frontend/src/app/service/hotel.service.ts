import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from 'app/model/hotel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private baseURL = "http://localhost:8081/hotel";

  // inject httpclient into service
  constructor(private httpClient: HttpClient) { }

  gelAllHotels(): Observable<Hotel[]>{
    return this.httpClient.get<Hotel[]>(`${this.baseURL}`)
  }

  getHotelById(id: string): Observable<Hotel>{
    return this.httpClient.get<Hotel>(`${this.baseURL}/${id}`)
  }

  createHotel(hotel: Hotel): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, hotel)
  }

  deleteHotel(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`)
  }
}
