import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinct, finalize, last } from 'rxjs';
import { Usuario } from 'src/app/interfaces/dto/IUsuarioDto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formulario = new FormGroup({
    dni: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  loading: boolean = false;
  disableBtn: boolean = true;
  errorMsg: boolean = false;
  mensajeError: string = '';
  hide = true;
  constructor(private loginService: AuthenticationService, private userService: UserService, private router: Router) { }


  login() {
    console.log(this.formulario.value)
    // this.prueba()
    this.loading = true;
    this.loginService.login(this.formulario.value).pipe(
      finalize(() => this.loading = false)
    ).subscribe(result => {
      // console.log('caso error')
      console.log('result: ', result)
      if (result.success) {
        const dni = this.formulario.value.dni
        this.obtenerUsuarioAndRoute(dni!)
      } else {
        this.loading = false;
        this.errorMsg = true;
        this.mensajeError = result.msg;
        return
      }
    })
  }


  async obtenerUsuarioAndRoute(id: string): Promise<void> {
    this.userService.obtenerDataUsuario(id).subscribe(result => {
      if (result.success) {
        this.loginService.cargarCredenciales(result.data, id)
        this.router.navigate(['/'])
      }
    })
  }




  bodyRegister(user: Usuario) {
    return {
      tipo: 0,// CREAR USUARIO
      data: {
        dni: user.dni,
        name: user.name,
        last: user.lastname,
        email: user.email,
        password: user.password,
        role: 3
      }
    }
  }


  prueba(){
    sessionStorage.setItem('token','gaaaa')

    sessionStorage.setItem('id',  '73124086')
    sessionStorage.setItem('role', '2')
    sessionStorage.setItem('name', 'josue')
    sessionStorage.setItem('lastname', 'romero')
    sessionStorage.setItem('token', 'gaaaaaa')
    sessionStorage.setItem('enable','true')

    this.router.navigate(['/'])
  }
}
