import { Component } from '@angular/core';
import { LoginService } from '@shared/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private loginService: LoginService) { }
  logout(): void {
    this.loginService.logout();
  }
}
