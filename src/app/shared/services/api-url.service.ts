import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {
  private apiUrl = 'http://localhost:3000';

  constructor() { }

  getApiUrl() {
    return this.apiUrl;
  }
}
