import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/dto/IUsuarioDto';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAddUsuarioComponent } from './edit-add-usuario/edit-add-usuario.component';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalEliminarComponent } from 'src/app/components/modal-eliminar/modal-eliminar.component';
import { Constante } from 'src/app/core/constants/Constante';
import { Subscription } from 'rxjs';
import { SocketIoService } from 'src/app/services/socket-io/socket-io.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [
  { dni: 7312, name: 'josue romero', lastname: 'villalva', email: 'jc@romer.pe', role: 2, enable: true },
  { dni: 11333, name: 'josue romero', lastname: 'villalva', email: 'jc@romer.pe', role: 3, enable: false },

];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['dni', 'name', 'email', 'role', 'habilate', 'edit/app'];
  dataSource = ELEMENT_DATA;


  listUsuarios: Usuario[];

  usuarioSesion: String | null;
  constructor(private _userService: UserService, public dialog: MatDialog, private socketService: SocketIoService) {
    this.listUsuarios = []
    this.usuarioSesion = sessionStorage.getItem('id')
  }


  private socketSubscription!: Subscription;

  ngOnInit() {
    console.log(this.usuarioSesion)
    this._userService.listUser().subscribe(
      result=>{
        this.listUsuarios=result.data.filter((user:any)=>user.dni!==this.usuarioSesion)
        this.dataSource=this.listUsuarios
        // this.dataSource=this.listUsuarios
      }
    );

    // this.socketService.sendMessage('hhola desde angular');
    // this.socketSubscription = this.socketService.listen('respuesta')
    //   .subscribe((data) => {
    //     console.log('respuesta del servidor : ', data)
    //   });

    // this.socketSubscription = this.socketService.listen('nuevoDato')
    //   .subscribe((data) => {
    //     console.log('Nuevo dato recibido desde el servidor:', data);
    //     // Actualizar la UI u otras operaciones según la respuesta del servidor
    //   });

  }

  ngOnDestroy(): void {
    console.log('debe de desconcetar')
    if (this.socketSubscription) {
      this.socketService.disconnect()
      this.socketSubscription.unsubscribe()
    }
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

  openDialogEdit(tipo: number, data?: Usuario,) {
    this.dialog.open(EditAddUsuarioComponent, {
      data: {
        usuario: data,
        tipo: tipo
      }
    })
  }

  opendDialogDelete(usuario: Usuario) {
    this.dialog.open(ModalEliminarComponent, {
      data: {
        usuario: usuario,
        tipo: Constante.TIPO_ELIMINAR_USUARIO
      }
    })
  }


}

