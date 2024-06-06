import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalMensajeComponent } from 'src/app/components/modal-mensaje/modal-mensaje.component';
import { Usuario } from 'src/app/interfaces/dto/IUsuarioDto';
import RoleUser from 'src/app/interfaces/enum/Roles';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { catchError, EMPTY, finalize, map, Observable } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  msgExitoso = "Gracias por registrarse, espere a que el Investigador le permite ingresar a la web";
  msgError = '';
  incorrectForm : boolean = false;
  public showProgressBar = false;
  formulario = new FormGroup({
    dni: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confiPassword: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),

  })


  constructor(private registerService: AuthenticationService, private dialog: MatDialog,private router:Router) {

  }


  register() {
    console.log(this.formulario.value)

    const conforme = this.validarPasswords(this.formulario.value)
    if (conforme) {
      this.showProgressBar = true
      this.registerService.register(this.bodyRegister(this.formulario.value))
        .pipe(
          finalize(() => { this.showProgressBar = false })
        ).subscribe(result => {
          console.log(result)
          if (result.success) {
            this.abrilModal()
          }else{
            this.incorrectForm=true;
            this.msgError=result.msg;
          }
        })
    }else{
      this.incorrectForm=true
      console.log('rpt inco')
      this.msgError='Las contraseñas no coinciden.'
    }

  }


  bodyRegister(user: any) {
    return {
      tipo: 0,
      data: {
        dni: user.dni,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        role: RoleUser.Estudiante,
        enable: false
      }
    }
  }


  abrilModal() {
    const dialogRef = this.dialog.open(ModalMensajeComponent, {
      width: '500px',
      data: { name: this.formulario.value.name, msg: this.msgExitoso }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('se cerró modal');
      this.router.navigate(['/login'])
    })
  }


  validarPasswords(data: any) {
    if (data.confiPassword == data.password) { this.incorrectForm =true; return true }
    return false
  }
}
