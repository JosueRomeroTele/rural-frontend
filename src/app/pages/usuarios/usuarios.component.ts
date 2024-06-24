import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/dto/IUsuarioDto';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAddUsuarioComponent } from './edit-add-usuario/edit-add-usuario.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [
  {dni: 7312, name: 'josue romero',lastname:'villalva', email: 'jc@romer.pe', role: 2,enable:true},
  {dni: 11333, name: 'josue romero',lastname:'villalva', email: 'jc@romer.pe', role: 3,enable:false},

];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  displayedColumns: string[] = ['dni', 'name', 'email', 'role','habilate','edit/app'];
  dataSource = ELEMENT_DATA;


  listUsuarios: Usuario[];

  usuarioSesion: String|null;
  constructor(private _userService: UserService,public dialog:MatDialog) {
    this.listUsuarios =[]
    this.usuarioSesion = sessionStorage.getItem('id')
  }

  ngOnInit() {
    console.log(this.usuarioSesion)
    this._userService.listUser().subscribe(
      result=>{
        this.listUsuarios=result.data.filter((user:any)=>user.dni!==this.usuarioSesion)
        this.dataSource=this.listUsuarios
        // this.dataSource=this.listUsuarios
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

  openDialogEdit(tipo:number,data?:Usuario,){
    this.dialog.open(EditAddUsuarioComponent,{
      data:{
        usuario:data,
        tipo:tipo
      }
    })
  }
}
