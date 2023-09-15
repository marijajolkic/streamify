import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from '@shared/services/api-url.service';// Import the ApiUrlService
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService, private router: Router,) { }

  resetPassword(resetToken: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrlService.getApiUrl()}/users/reset-password`, { resetToken, newPassword });
  }
  
}

