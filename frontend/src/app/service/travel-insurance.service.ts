import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TravelInsurance } from 'app/model/travel-insurance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelInsuranceService {

  private baseURL = "http://localhost:8081/travel-insurance";

  constructor(private httpClient: HttpClient) { }

  getAllTravelInsurance(): Observable<TravelInsurance[]>{
    return this.httpClient.get<TravelInsurance[]>(`${this.baseURL}`)
  }

  createTravelInsurance(insurance: TravelInsurance): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, insurance)
  }

  getInsuranceById(id: string): Observable<TravelInsurance>{
    return this.httpClient.get<TravelInsurance>(`${this.baseURL}/${id}`)
  }

  deleteInsurance(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`)
  }
}
