import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent {
  actors: string[] = [];
  categories: string[] = [];
  tvShows: any[] = [];
  movies: any[] = [];

  actorForm: FormGroup;
  categoryForm: FormGroup;
  tvShowForm: FormGroup;
  movieForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.actorForm = this.fb.group({
      name: [''],
    });
    this.categoryForm = this.fb.group({
      name: [''],
    });
    this.tvShowForm = this.fb.group({
      name: [''],
    });
    this.movieForm = this.fb.group({
      name: [''],
    });
    // ... (set up the other forms similarly, with additional fields as needed)
  }

  addActor() {
    this.actors.push(this.actorForm.value.name);
    this.actorForm.reset();
  }
  addCategory() {
    this.actors.push(this.actorForm.value.name);
    this.actorForm.reset();
  }
  addTVShow() {
    this.actors.push(this.actorForm.value.name);
    this.actorForm.reset();
  }
  addMovie() {
    this.actors.push(this.actorForm.value.name);
    this.actorForm.reset();
  }
  
}
