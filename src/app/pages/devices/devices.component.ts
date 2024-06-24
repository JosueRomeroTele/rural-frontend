import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDeviceComponent } from './form-device/form-device.component';
import { Dispositivo } from 'src/app/interfaces/dto/IDispositivo';
import { Route, Router } from '@angular/router';


const ELEMENT_DATA: any[] = [
  {serie: 7312,
    nombre: 'DHR=2311',
    parametros:[{parametro:'temperatura',unidad:'fare'},{parametro:'humedad',unidad:'Co'}],
    parametrosProm: [{parametro:'temperatura',valor:80},{parametro:'humedad',valor: 78.2}],
    usuario: 'josue romero,73124086,3',
    cantAlertas: 2,
    description:'descripcion  del dispositivo'
  },

  {serie: 7300212,
    nombre: 'DHR=2311',
    parametros:[{parametro:'temperatura',unidad:'fare'},{parametro:'humedad',unidad:'Co'}],
    parametrosProm: [{parametro:'temperatura',valor:80},{parametro:'humedad',valor: 78.2}],
    usuario: 'josue romero,73124086,3',
    cantAlertas: 2,
    description:'descripcion  del dispositivo'
  },
  {serie: 9898989,
    nombre: 'DHR=2311',
    parametros:[{parametro:'temperatura',unidad:'fare'},{parametro:'humedad',unidad:'Co'}],
    parametrosProm: [{parametro:'temperatura',valor:80},{parametro:'humedad',valor: 78.2}],
    usuario: 'josue romero,73124086,3',
    cantAlertas: 2,
    description:'descripcion  del dispositivo'
  },
  {serie: 11111,
    nombre: 'DHR=2311',
    parametros:[{parametro:'temperatura',unidad:'fare'},{parametro:'humedad',unidad:'Co'}],
    parametrosProm: [{parametro:'temperatura',valor:80},{parametro:'humedad',valor: 78.2}],
    usuario: 'josue romero,73124086,3',
    cantAlertas: 2,
    description:'descripcion  del dispositivo'
  },
  {serie: 3443322,
    nombre: 'DHR=2311',
    parametros:[{parametro:'temperatura',unidad:'fare'},{parametro:'humedad',unidad:'Co'}],
    parametrosProm: [{parametro:'temperatura',valor:80},{parametro:'humedad',valor: 78.2}],
    usuario: 'josue romero,73124086,3',
    cantAlertas: 2,
    description:'descripcion  del dispositivo'
  },

];


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  listaDispositivos = ELEMENT_DATA;
  listDevices: Dispositivo[]=[];
  constructor(public dialog: MatDialog, private router:Router){

  }

  openForm(tipo:number){
    this.dialog.open(FormDeviceComponent,{
      data:{
        tipo : tipo
      }
    })
  }


  navigateToDetail(serie: number): void {
    this.router.navigate(['/device', serie]);
  }

  ngOnInit(): void {

  }
}
