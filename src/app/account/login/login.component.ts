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
    dni: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
  })
  loading:boolean = false;
  constructor(private loginService:AuthenticationService,private router: Router){}


  login(){
    console.log(this.formulario.value)
    this.loading=true;
    this.loginService.login(this.formulario.value).pipe(
      finalize(()=>this.loading=false)
    ).subscribe(result =>{
      if(result.success){
        const dni = this.formulario.value.dni
        this.loginService.cargarCredenciales(result,dni==undefined?'':dni)
        this.router.navigate(['/'])
      }
    })
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
