import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseURL = "http://localhost:8081/cart";
  private view = "view";

  constructor(private httpClient: HttpClient) { }

  addToCart(id: string, userId: string, extraString: string): Observable<Object> {
    const requestBody = {
      userId: userId,
      extraParam: extraString
    };
    console.log(requestBody);
    console.log(id);
    return this.httpClient.post(`${this.baseURL}/${id}`, requestBody);
  }

  addToCartList(userId: string): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/${this.view}/${userId}`);
  }
}
