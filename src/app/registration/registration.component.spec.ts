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
      user_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onUsernameBlur() {
    this.userService.isUsernameTaken(this.form.get('user_name')!.value)
  .subscribe(response => {
    this.usernameTaken = response;
  }, error => {
    console.error('Username check failed', error);
  });

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
