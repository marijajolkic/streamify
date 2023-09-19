import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../api-url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private httpClient: HttpClient, private apiUrlService: ApiUrlService) { }

  private baseUrl = this.apiUrlService.getApiUrl(); // Adjust the port to match your server's


  getAllActors(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/actors`);
  }

  getActorById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/actors/${id}`);
  }

  addActor(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/actors`, data);
  }

  updateActor(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/actors/${id}`, data);
  }

  deleteActor(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/actors/${id}`);
  }
}
