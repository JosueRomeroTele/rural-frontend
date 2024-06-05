import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalMensajeComponent } from 'src/app/componenents/modal-mensaje/modal-mensaje.component';
import { Usuario } from 'src/app/interfaces/dto/IUsuarioDto';
import RoleUser from 'src/app/interfaces/enum/Roles';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {




  formulario = new FormGroup({
    dni: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    name: new FormControl(),
    lastname: new FormControl()
  })
  constructor(private registerService:AuthenticationService,private dialog:MatDialog) {

  }


  register() {
    console.log('formulario : ', this.formulario.value)
    const data = this.bodyRegister(this.formulario.value);
    console.log(data)
    this.abrilModal()
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
        role: RoleUser.Estudiante
      }
    }
  }


  abrilModal(){
    const dialogRef = this.dialog.open(ModalMensajeComponent,{
      width:'250px',
      data:{name:this.formulario.value.name}
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log('se cerró modal');

    })
  }
}
