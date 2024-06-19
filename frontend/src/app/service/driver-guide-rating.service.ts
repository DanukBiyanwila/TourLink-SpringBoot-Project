import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DriverGuideRatingDto } from 'app/dto/driver-guide-rating-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverGuideRatingService {

  private baseURL = "http://localhost:8081/driver-guide-rating";

  constructor(private httpClient: HttpClient) { }

  getAllDriverGuideRatingById(userId: string): Observable<DriverGuideRatingDto[]> {
    return this.httpClient.get<DriverGuideRatingDto[]>(`${this.baseURL}/${userId}`)
  }

  getSingleDriverGuideRatingBySession(): Observable<DriverGuideRatingDto[]> {
    return this.httpClient.get<DriverGuideRatingDto[]>(`${this.baseURL}`)
  }

  createRate(rate: DriverGuideRatingDto): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, rate);
  }

}
