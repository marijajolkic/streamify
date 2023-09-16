import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '@shared/services/login.service';
import { RolesService } from '@shared/services/roles.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  selectedOption: string = 'movie';

  isAdmin = false;
  isUser = false;

  constructor(private rolesService: RolesService,private loginService: LoginService) { }
  logout(): void {
    this.loginService.logout();
  }

  ngOnInit(): void {
    this.rolesService.roles$.subscribe((roles) => {
      this.isAdmin = roles.includes('admin');
      this.isUser = roles.includes('user');
    });
    this.rolesService.getUserRoles();
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  categories = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Sci-fi',
    // ... add other categories here
  ];

  selectedCategories = new FormControl([]);

  resetCategories() {
    this.selectedCategories.setValue([]);
  }
}
