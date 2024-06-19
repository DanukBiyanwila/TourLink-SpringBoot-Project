import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OtherFacilities } from 'app/model/other-facilities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherFacilitiesService {

  private baseURL = "http://localhost:8081/other-facilities";

  constructor(private httpClient: HttpClient) { }

  getAllOtherFacilities(): Observable<OtherFacilities[]>{
    return this.httpClient.get<OtherFacilities[]>(`${this.baseURL}`)
  }

  createOtherFacilities(otherFacilities: OtherFacilities): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, otherFacilities)
  }

  getOtherFacilitiesById(id: string): Observable<OtherFacilities>{
    return this.httpClient.get<OtherFacilities>(`${this.baseURL}/${id}`)
  }

  deleteOtherFacilities(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`)
  }

}
