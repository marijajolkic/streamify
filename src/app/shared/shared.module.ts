import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiUrlService } from '@shared/services/api-url.service';
import { UserService } from '@shared/services/user.service';
import { LoginService } from '@shared/services/login.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    EmailVerificationComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApiUrlService,
    UserService,
    LoginService // Add it to the providers array
  ],
  exports: [
    // export components, directives, etc
  ],
})
export class SharedModule { }
