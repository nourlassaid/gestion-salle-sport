import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-planning',
  templateUrl: './add.component.html'
})
export class AddComponent {
  selectedFiles: File[] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadImages() {
    const formData = new FormData();
    this.selectedFiles.forEach(file => formData.append('images', file));

    this.http.post('http://localhost:3000/api/planning/upload-multiple', formData)
      .subscribe({
        next: res => alert('Planning(s) ajouté(s) avec succès.'),
        error: err => alert('Erreur lors de l\'upload.')
      });
  }
}
