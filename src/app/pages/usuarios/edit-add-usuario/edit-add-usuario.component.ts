import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../../interfaces/dto/IUsuarioDto';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit-add-usuario',
  templateUrl: './edit-add-usuario.component.html',
  styleUrls: ['./edit-add-usuario.component.css']
})
export class EditAddUsuarioComponent implements OnInit {

  formulario = new FormGroup({
    dni: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    role: new FormControl(0, Validators.required),
    enable:new FormControl(true,Validators.required)
  });


  enable: boolean |undefined;
  tipo:number;
  editUser : Usuario;
  disableDni:boolean = false;
  loading:boolean=false;

  roles = [
    { id: 2, name: 'Investigador' },
    { id: 3, name: 'Estudiante' }
  ];



  constructor(@Inject(MAT_DIALOG_DATA) private data:any){
    this.editUser=data.usuario;
    this.tipo = data.tipo;

    this.formulario = new FormGroup({
      dni: new FormControl({ value: '', disabled: this.tipo === 1 }, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      role: new FormControl(0,Validators.required),
      enable:new FormControl(true,Validators.required)
    });
  }


  ngOnInit(): void {
    if (this.tipo === 1) {
      this.formulario.patchValue(this.editUser);
      this.disableDni = true;
    }
  }

  registrar() {
    console.log('hla')
    console.log(this.formulario.value)
    // Tu lógica para registrar o actualizar el usuario
  }

}
