import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planning-upload',
  templateUrl: './planning-upload.component.html',
  styleUrls: ['./planning-upload.component.css']
})
export class PlanningUploadComponent {
  selectedFiles: File[] = [];
  uploadSuccess = false;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit() {
    const formData = new FormData();
    this.selectedFiles.forEach(file => formData.append('images', file));

    this.http.post('http://localhost:3000/api/plannings/upload-multiple', formData)
      .subscribe(() => {
        this.uploadSuccess = true;
      });
  }
}
