import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { last } from 'rxjs';
import { Usuario } from 'src/app/interfaces/dto/IUsuarioDto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formulario = new FormGroup({
    dni: new FormControl(),
    name: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  })

  constructor(){}


  login(){
    // this.loginService.login()
    console.log('entra')
  }




  bodyRegister(user:Usuario){
    return {
      tipo:0,// CREAR USUARIO
      data:{
        dni: user.dni,
        name: user.name,
        last: user.lastname,
        email: user.email,
        password:user.password,
        role:3
      }
    }
  }
}
