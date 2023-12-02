import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://api.escuelajs.co/api/v1';

  constructor(private http:HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products?categoryId=${categoryId}`);
  }

  getDefaultProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products?offset=0&limit=10`);
  }
}
