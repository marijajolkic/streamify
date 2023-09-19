import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActorService } from '@shared/services/content/actor.service';
import { CategoryService } from '@shared/services/content/category.service';
import { TVShowService } from '@shared/services/content/tv-show.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  displayedColumns: string[] = ['tv_show_name', 'number_of_seasons', 'release_date', 'actions'];
  dataSource: any[] = [];
  tvShowForm: FormGroup;
  actors: any[] = [];
  categories: any[] = [];
  isEditing = false;
  editingTvShowId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private tvShowService: TVShowService,
    private actorService: ActorService,
    private categoryService: CategoryService
  ) { 
    this.tvShowForm = this.fb.group({
      tv_show_name: [''],
      number_of_seasons: [''],
      release_date: [''],
      actors: [''],
      categories: ['']
    });
  }

  ngOnInit(): void {
    this.fetchActors();
    this.fetchCategories();
    this.fetchTVShows();
  }

  fetchActors(): void {
    this.actorService.getAllActors().subscribe(actors => {
      this.actors = actors;
    });
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  fetchTVShows(): void {
    this.tvShowService.getAllTVShows().subscribe(tvShows => {
      console.log(tvShows); // Add this line to inspect the data structure
      this.dataSource = tvShows;
    });
  }

  onSubmit() {
    if (this.tvShowForm.valid) {
      const newTVShow = {
        tv_show_name: this.tvShowForm.value.tv_show_name,
        number_of_seasons: this.tvShowForm.value.number_of_seasons,
        release_date: this.tvShowForm.value.release_date,
        actors: this.tvShowForm.value.actors,
        categories: this.tvShowForm.value.categories
      };
      if (this.isEditing) {
        this.tvShowService.updateTVShow(this.editingTvShowId!, newTVShow).subscribe(response => {
          this.isEditing = false;
          this.editingTvShowId = null;
          this.tvShowForm.reset();
          this.fetchTVShows();
        });
      } else {
        this.tvShowService.addTVShow(newTVShow).subscribe(response => {
          this.tvShowForm.reset();
          this.fetchTVShows();
        });
      }
    }
  }

  onEdit(tvShow: any) {
    this.isEditing = true;
    this.editingTvShowId = tvShow.tv_show_id; // Adjusted property name
    this.tvShowForm.patchValue({
      tv_show_name: tvShow.tv_show_name, // Adjusted property name
      number_of_seasons: tvShow.number_of_seasons, // Adjusted property name
      release_date: tvShow.release_date, // Adjusted property name
      actors: tvShow.actors.map((actor: any) => actor.id), // Ensure the 'id' property name is correct
      categories: tvShow.categories.map((category: any) => category.id), // Ensure the 'id' property name is correct
    });
  }

  onDelete(tvShowId: number) {
    this.tvShowService.deleteTVShow(tvShowId).subscribe(response => {
      this.fetchTVShows();
    });
  }
}
