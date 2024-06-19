import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DriverGuidePackage } from 'app/model/driver-guide-package';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverGuidePackageService {

  private baseURL = "http://localhost:8081";

  private guideUrl = "guide"
  private packageUrl = "package"
  private singleUrl = "single"


  private driverUrl = "driver"
  private touristPackageUrl = "tourist-package"

  private singlePackage = "pack"

  constructor(private httpClient: HttpClient) { }

  getAllGuidePackages(id: string): Observable<DriverGuidePackage[]>{
    return this.httpClient.get<DriverGuidePackage[]>(`${this.baseURL}/${this.guideUrl}/${this.packageUrl}/${id}`)
  }

  getAllUserPackages(id: string): Observable<DriverGuidePackage[]>{
    return this.httpClient.get<DriverGuidePackage[]>(`${this.baseURL}/${this.touristPackageUrl}/${id}`)
  }

  
  getGuidePackages(): Observable<DriverGuidePackage[]>{
    return this.httpClient.get<DriverGuidePackage[]>(`${this.baseURL}/${this.guideUrl}/${this.packageUrl}/${this.singleUrl}`)
  }

  createGuidePackage(guidePackage: DriverGuidePackage): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.guideUrl}`, guidePackage)
  }

  getDriverPackages(): Observable<DriverGuidePackage[]>{
    return this.httpClient.get<DriverGuidePackage[]>(`${this.baseURL}/${this.driverUrl}/${this.packageUrl}/${this.singleUrl}`)
  }

  getAllDriverPackages(id: string): Observable<DriverGuidePackage[]>{
    return this.httpClient.get<DriverGuidePackage[]>(`${this.baseURL}/${this.driverUrl}/${this.packageUrl}/${id}`)
  }

  createDriverPackage(guidePackage: DriverGuidePackage): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.driverUrl}`, guidePackage)
  }

  getSinglePackageDetails(id: string): Observable<DriverGuidePackage>{
    return this.httpClient.get<DriverGuidePackage>(`${this.baseURL}/${this.guideUrl}/${this.singlePackage}/${id}`)
  }

  deletePackage(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${this.guideUrl}/${id}`)
  }


}
