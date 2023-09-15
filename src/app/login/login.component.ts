import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@shared/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;  // Added the non-null assertion here
  errorMessage: string | null = null;
  constructor(private fb: FormBuilder,private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe(
        response => {
          console.log('Login successful', response);
          // handle successful login, e.g., navigate to a different page
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed', error);
          // handle login failure, e.g., show an error message
          this.errorMessage = 'Login failed. Please check your email and password.';
        }
      );
    }
  }
  resetPassword() {
    if (this.loginForm.controls['email'].valid) {
      console.log(this.loginForm.controls['email'].value)
      this.loginService.initiatePasswordReset(this.loginForm.controls['email'].value).subscribe(
        () => alert('Password reset link sent'),
        err => {
          console.error('Error object:', err);
          alert('Error sending password reset link');
        }
      );
    } else {
      alert('Please enter a valid email');
    }
  }

}
