import { Component, signal } from '@angular/core';
import { Utilitario } from 'src/app/utils/Utilitario';

export type MenuItem = {
  icon:string;
  label:string;
  router:string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  nombre : string | null = sessionStorage.getItem('name')
  apellido : string | null  = sessionStorage.getItem('lastname')
  rol : string | null

  menuItems = signal<MenuItem[]>([
    { icon: 'home', label: 'Home', router: '' },
    { icon: 'group', label: 'Usuarios', router: '/usuarios' },
    { icon: 'bluetooth_connected', label: 'Dispositivos', router: '/devices' },
  ])

  constructor(){
    this.rol = Utilitario.getRoleName(Number(sessionStorage.getItem('role')))
  }
}
