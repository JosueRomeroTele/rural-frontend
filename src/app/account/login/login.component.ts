import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinct, finalize, last } from 'rxjs';
import { Usuario } from 'src/app/interfaces/dto/IUsuarioDto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

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
  constructor(private loginService: AuthenticationService, private router: Router) { }


  login() {
    console.log(this.formulario.value)
    sessionStorage.setItem('token','gaaaaaaa')
    this.router.navigate(['/'])
    sessionStorage.setItem('name','pedrito')
    sessionStorage.setItem('lastname','sanvhezz')
    this.loading = true;
    this.loginService.login(this.formulario.value).pipe(
      finalize(() => this.loading = false)
    ).subscribe(result => {
      // console.log('caso error')
      console.log('result: ', result)
      if (result.success) {
        const dni = this.formulario.value.dni
        this.loginService.cargarCredenciales(result, dni == undefined ? '' : dni)
        this.router.navigate(['/'])
      } else {
        this.loading = false;
        // this.disableBtn=true;

        this.errorMsg = true;
        this.mensajeError=result.msg;

        return
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
}
