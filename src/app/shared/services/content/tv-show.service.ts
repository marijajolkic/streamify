// tv-show.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from '../api-url.service';

@Injectable({
  providedIn: 'root'
})
export class TVShowService {
  
  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  private baseUrl = this.apiUrlService.getApiUrl(); // Adjust the port to match your server's

  getAllTVShows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv-shows`);
  }

  getTVShowById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv-shows/${id}`);
  }

  addTVShow(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tv-shows/`, data);
  }

  updateTVShow(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tv-shows/${id}`, data);
  }

  deleteTVShow(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tv-shows/${id}`);
  }
}
