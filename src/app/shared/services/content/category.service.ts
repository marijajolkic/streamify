import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from '../api-url.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {



  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  private baseUrl = this.apiUrlService.getApiUrl(); // Adjust the port to match your server's

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${id}`);
  }

  addCategory(data: { category_name: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, data);
  }

  updateCategory(id: number, data: { category_name: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }
}
