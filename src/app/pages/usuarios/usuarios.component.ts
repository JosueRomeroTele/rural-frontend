import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/dto/IUsuarioDto';
import RoleUser from 'src/app/interfaces/enum/Roles';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  listUsuarios: Usuario[];
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  usuarioSesion: String|null;
  constructor(private _userService: UserService) {
    this.listUsuarios =[]
    this.usuarioSesion = sessionStorage.getItem('id')
  }

  ngOnInit() {
    console.log(this.usuarioSesion)
    this._userService.listUser().subscribe(
      result=>{
        this.listUsuarios=result.data.filter((user:any)=>user.dni!==this.usuarioSesion)
      }
    );
  }

  getRoleName(role: number): string {
    const roleMap: { [key: number]: string } = {
      0: 'SuperAdmin',
      1: 'Admin',
      2: 'Investigador',
      3: 'Estudiante',
    };
    return roleMap[role] || "SIN ROL";
  };

}
