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

  listUsuarios: Usuario[] = [
    { dni: '12323', name: "josue", email: "josue.romer@pucp.edu.pe", role: 3 },
    { dni: '1112', name: "romero", email: "josue.romer@pucp.edu.pe", role: 2 },
    { dni: '1344555', name: "villava", email: "josue.romer@pucp.edu.pe", role: 1 }
  ]
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(private _userService: UserService) {

  }

  ngOnInit() {
    // this.getListUsuarios();
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

// getListUsuarios(){
//   this._userService.getListUsuarios().subscribe((data) => {
//     console.log(data)
//   })
// }
}
