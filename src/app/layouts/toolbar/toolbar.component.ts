import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor
  (private authService: AuthenticationService,private router:Router){}

  nombre : string | null = sessionStorage.getItem('name')
  apellido : string | null  = sessionStorage.getItem('lastname')
  cerrarSesion(){
    console.log('ciera o no')
    this.authService.borrarCredenciales()
    this.router.navigate(['/login'])
  }
}
