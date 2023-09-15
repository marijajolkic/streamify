import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { EmailVerificationComponent } from '@shared/components/email-verification/email-verification.component';
import { PasswordChangeComponent } from '@shared/components/password-change/password-change.component';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'email-verification', component: EmailVerificationComponent },
  { path: 'password-change', component: PasswordChangeComponent },
  // add more routes as needed

  
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
