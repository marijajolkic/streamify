import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '@shared/services/content/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['category_name'];
  dataSource: any[] = [];  // Change type to any to match the data structure
  categoryForm: FormGroup;
  editingCategoryId: number | null = null; // New property to track editing state
  
  constructor(private fb: FormBuilder, private categoryService: CategoryService) { 
    this.categoryForm = this.fb.group({
      categoryName: ['']
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.dataSource = data;
      },
      error => {
        console.error('There was an error fetching the categories!', error);
      }
    );
  }

  onEdit(id: number, name: string): void {
    this.editingCategoryId = id;
    this.categoryForm.patchValue({ categoryName: name });
  }

  onDelete(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      response => {
        this.fetchCategories(); // Update the list after deletion
      },
      error => {
        console.error('There was an error deleting the category!', error);
      }
    );
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData = { category_name: this.categoryForm.value.categoryName };
      if (this.editingCategoryId !== null) {
        // Update existing category
        this.categoryService.updateCategory(this.editingCategoryId, categoryData).subscribe(
          response => {
            this.categoryForm.reset();
            this.editingCategoryId = null; // Reset editing ID after successful update
            this.fetchCategories();
          },
          error => {
            console.error('There was an error updating the category!', error);
          }
        );
      } else {
        // Add new category
        this.categoryService.addCategory(categoryData).subscribe(
          response => {
            this.categoryForm.reset();
            this.fetchCategories(); // fetch categories again to update the list
          },
          error => {
            console.error('There was an error adding the category!', error);
          }
        );
      }
    }
  }
}
