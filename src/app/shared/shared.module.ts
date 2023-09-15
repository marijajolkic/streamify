import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiUrlService } from '@shared/services/api-url.service';
import { UserService } from '@shared/services/user.service';
import { LoginService } from '@shared/services/login.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { VideoPlayerComponent } from './components/password-change/video-player/video-player.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    EmailVerificationComponent,
    PasswordChangeComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    ApiUrlService,
    UserService,
    LoginService // Add it to the providers array
  ],
  exports: [
    // export components, directives, etc
    NotFoundComponent,
    EmailVerificationComponent,
    PasswordChangeComponent
  ],
})
export class SharedModule { }
