import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-modal-upload-file',
  templateUrl: './modal-upload-file.component.html',
  styleUrls: ['./modal-upload-file.component.css']
})
export class ModalUploadFileComponent {

  selectedFile: File | null = null;
  constructor(private http: HttpClient,private deviceService:DeviceService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(event.target.files[0])

  }

  onSubmit(event: any) {
    event.preventDefault();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // this.http.post('/api/user/upload', formData).subscribe(response => {
      //   console.log('Archivo subido exitosamente', response);
      // }, error => {
      //   console.error('Error al subir el archivo', error);
      // });
      this.deviceService.uploadData(formData).subscribe(res=>{
        console.log(res)
      })
    }
  }
}
