import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from '@shared/services/api-url.service';// Import the ApiUrlService

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private apiUrlService: ApiUrlService, // Inject the ApiUrlService
  ) {}

  isUsernameTaken(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlService.getApiUrl()}/users/isUsernameTaken/${username}`);
  }
}
