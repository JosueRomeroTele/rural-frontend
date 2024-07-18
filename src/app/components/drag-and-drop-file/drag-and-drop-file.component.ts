import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utilitario } from 'src/app/utils/Utilitario';



export interface FileInfo {
  file: File;
  name: string;
  fullname: string;
  extension: string;
  size: string;
}


@Component({
  selector: 'app-drag-and-drop-file',
  templateUrl: './drag-and-drop-file.component.html',
  styleUrls: ['./drag-and-drop-file.component.css']
})
export class DragAndDropFileComponent implements OnInit {


  @Input()
  fileInfo: FileInfo = {
    file: {} as File, // Necesario porque File no puede ser inicializado directamente
    name: '',
    fullname: '',
    extension: '',
    size: ''
  };

  @Output()
  fileInfoChange: EventEmitter<FileInfo> = new EventEmitter<FileInfo>();

  @Input()
  accept: string = "txt";

  @Input()
  height: string = '250px';

  @Input()
  marginTop: string = '12px';

  @Input()
  showError: boolean = false;

  @Input()
  ocultarResumen: boolean = false;

  @Input()
  maxSize: number = 100 * 1000 * 1000;

  constructor(private readonly snackBar: MatSnackBar,){
  }


  recibirArchivo(files: File[]) {
    if (!files || files.length === 0)
      return;

    const extension = files[0].name.substring(files[0].name.lastIndexOf(".") + 1);

    if (!this.accept.includes(extension)) {
      //mensaje de que no es una extension correcta
      return;
    }

    this.fileInfo = {
      file: files[0],
      extension: `.${extension}`,
      name: files[0].name.substring(0, files[0].name.lastIndexOf(".")),
      fullname: files[0].name,
      size: files[0].size
        + ' KB',
    };
    this.fileInfoChange.emit(this.fileInfo);
    this.showError = false;


  }
  ngOnInit(): void {

  }

  fileName = '';

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        // const upload$ = this.http.post("/api/thumbnail-upload", formData);

        // upload$.subscribe();
    }
}

}
