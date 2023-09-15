import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordChangeService } from './password-change.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent {
  resetPasswordForm: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private passwordChangeService: PasswordChangeService // Replace with your service name
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log('Reset token:', this.token);
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      const { password, confirmPassword } = this.resetPasswordForm.value;
      if (password === confirmPassword) {
        this.passwordChangeService.resetPassword(this.token, password).subscribe(
          () => alert('Password successfully reset'),
          (err) => {
            console.error('Error resetting password', err);
            alert('Error resetting password');
          }
        );
      } else {
        alert('Passwords do not match');
      }
    } else {
      if (!this.resetPasswordForm.valid) {
        alert('Form is invalid');
      }
      if (!this.token) {
        alert('Reset token is missing');
      }
    }
  }
  
}
