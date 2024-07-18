import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constante } from 'src/app/core/constants/Constante';
import { Utilitario } from 'src/app/utils/Utilitario';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent {

  mensaje:string=''

  constructor(public dialogRef: MatDialogRef<ModalEliminarComponent>,@Inject(MAT_DIALOG_DATA) private data:any,private _snackBar: MatSnackBar){

  }


  aceptar(){
    this.dialogRef.close()
    if(this.data.tipo == Constante.TIPO_ELIMINAR_USUARIO){
      this.mensaje = Constante.MENSAJE_OK_ELIMINAR_USUARIO
    }
    Utilitario.mostrarSnackbar(this._snackBar,this.mensaje,this.data.tipo)
  }
}
