import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HotelPackage } from 'app/model/hotel-package';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelPackagesServiceService {

  private baseURL = "http://localhost:8081/hotel-package";

  private onePackageUrl = "one"

  constructor(private httpClient: HttpClient) { }

  gelAllHotelPackagesById(id: string): Observable<HotelPackage[]>{
    return this.httpClient.get<HotelPackage[]>(`${this.baseURL}/${id}`)
  }

  createHotelPackage(hotelPackage: HotelPackage): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, hotelPackage)
  }

  getHotelPackageById(id: string): Observable<HotelPackage>{
    return this.httpClient.get<HotelPackage>(`${this.baseURL}/${this.onePackageUrl}/${id}`)
  }

  deleteHotelPackageById(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`)
  }

}
