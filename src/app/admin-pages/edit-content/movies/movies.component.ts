import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource: { name: string }[] = [];
  movieForm: FormGroup;
  
  constructor(private fb: FormBuilder) { 
    this.movieForm = this.fb.group({
      movieName: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.movieForm.valid) {
      this.dataSource.push({ name: this.movieForm.value.movieName });
      this.movieForm.reset();
    }
  }
}
