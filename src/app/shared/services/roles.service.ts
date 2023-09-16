import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';
import { ApiUrlService } from '@shared/services/api-url.service';
@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();
  

  constructor(private http: HttpClient, private loginService: LoginService,private apiUrlService: ApiUrlService) {}

  getUserRoles(): void {
    const userId = this.loginService.getUserIDFromToken();
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    this.http.get<string[]>(`${this.apiUrlService.getApiUrl()}/users/${userId}/roles`).subscribe(
      (roles) => {
        this.rolesSubject.next(roles);
      },
      (error) => {
        console.error('Failed to fetch roles', error);
      }
    );
  }
}
