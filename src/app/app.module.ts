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
import { EditContentComponent } from './admin-pages/edit-content/edit-content.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { UsersComponent } from './admin-pages/users/users.component';
import { ActorsComponent } from './admin-pages/edit-content/actors/actors.component';
import { CategoriesComponent } from './admin-pages/edit-content/categories/categories.component';
import { MoviesComponent } from './admin-pages/edit-content/movies/movies.component';
import { TvShowsComponent } from './admin-pages/edit-content/tv-shows/tv-shows.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    VideoPlayerComponent,
    NavComponent,
    EditContentComponent,
    UsersComponent,
    ActorsComponent,
    CategoriesComponent,
    MoviesComponent,
    TvShowsComponent,
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
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
