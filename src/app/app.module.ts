import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';

import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    VideoPlayerComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    SharedModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
