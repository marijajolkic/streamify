import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActorService } from '@shared/services/content/actor.service';
 // Adjust the path as necessary

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: any[] = [];
  actorForm: FormGroup;
  editingActorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private actorService: ActorService // Inject the actor service
  ) {
    this.actorForm = this.fb.group({
      actorName: ['']
    });
  }

  ngOnInit(): void {
    this.loadActors();
  }

  loadActors() {
    this.actorService.getAllActors().subscribe(
      data => {
        this.dataSource = data;
      },
      error => {
        console.error('Error fetching actors', error);
      }
    );
  }

  onSubmit() {
    if (this.actorForm.valid) {
      const actorData = { actor_name: this.actorForm.value.actorName };
      if (this.editingActorId !== null) {
        // Update existing actor
        this.actorService.updateActor(this.editingActorId, actorData).subscribe(
          () => {
            this.actorForm.reset();
            this.editingActorId = null;
            this.loadActors();
          },
          error => {
            console.error('Error updating actor', error);
          }
        );
      } else {
        // Add new actor
        this.actorService.addActor(actorData).subscribe(
          () => {
            this.actorForm.reset();
            this.loadActors();
          },
          error => {
            console.error('Error adding actor', error);
          }
        );
      }
    }
  }

  onEdit(id: number, name: string) {
    this.editingActorId = id;
    this.actorForm.patchValue({ actorName: name });
  }

  onDelete(id: number) {
    this.actorService.deleteActor(id).subscribe(
      () => {
        this.loadActors();
      },
      error => {
        console.error('Error deleting actor', error);
      }
    );
  }
}
