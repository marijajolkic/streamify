import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ApiUrlService } from '@shared/services/api-url.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  form: FormGroup;
  usernameTaken: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiUrlService: ApiUrlService,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      user_name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9_]*$') // Only allow usernames with letters, numbers, and underscores
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$') // Validate against a standard email pattern
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
        Validators.pattern('(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*') // Ensure at least 1 uppercase letter, 1 number, and 1 special character
      ]],
    });
  }

  ngOnInit() {
    console.log(this.apiUrlService.getApiUrl());
  }

  onUsernameBlur() {
    const user_name = this.form.get('user_name')?.value;
    if (user_name) {
      this.userService.isUsernameTaken(user_name)
        .subscribe(response => {
          console.log('Response:', response);  // Debugging line to check the response structure
          this.usernameTaken = response.isTaken; // Adjust this line based on the actual response structure
        }, error => {
          console.error('Username check failed', error);
        });
    }
  }

  onSubmit() {
    if (this.form.valid && !this.usernameTaken) {
      this.http.post(`${this.apiUrlService.getApiUrl()}/users/register`, this.form.value)
        .subscribe(response => {
          console.log('Registration successful', response);
        }, error => {
          console.error('Registration failed', error);
        });
    }
  }
}
