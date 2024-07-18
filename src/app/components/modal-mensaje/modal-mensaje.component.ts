import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-mensaje',
  templateUrl: './modal-mensaje.component.html',
  styleUrls: ['./modal-mensaje.component.css']
})
export class ModalMensajeComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  aceptar():void{

  }
}
