import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HotelUserRatingDTO } from 'app/dto/hotel-user-rating-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelUserRatingDTOService {

  private baseURL = "http://localhost:8081/hotel-rating";

  constructor(private httpClient: HttpClient) { }

  getAllHotelRatingById(hotelId: string): Observable<HotelUserRatingDTO[]> {
    return this.httpClient.get<HotelUserRatingDTO[]>(`${this.baseURL}/${hotelId}`);
}

}
