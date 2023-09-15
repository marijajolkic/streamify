// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from '@shared/services/api-url.service';// Import the ApiUrlService
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //private apiUrl = this.ApiUrlService.getApiUrl(); // Replace with your API base URL

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService, private router: Router,) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlService.getApiUrl()}/users/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Navigate to login page after logout
  }

  initiatePasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlService.getApiUrl()}/users/initiate-password-reset`, { email });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
