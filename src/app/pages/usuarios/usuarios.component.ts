import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  listUsuarios : Usuario[]= [
    {id:1,nombre:"josue",correo:"josue.romer@pucp.edu.pe",rol:"estudiante"},
    {id:2,nombre:"josue2",correo:"josue.romer@pucp.edu.pe",rol:"estudiante"},
    {id:3,nombre:"josue3",correo:"josue.romer@pucp.edu.pe",rol:"estudiante"},
    {id:4,nombre:"josue4",correo:"josue.romer@pucp.edu.pe",rol:"estudiante"},
    {id:4,nombre:"josue4",correo:"josue.romer@pucp.edu.pe",rol:"estudiante"},
    {id:4,nombre:"josue4",correo:"josue.romer@pucp.edu.pe",rol:"estudiante"},
    {id:4,nombre:"josue4",correo:"josue.romer@pucp.edu.pe",rol:"estudiante"},
  ]
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

}
