import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDeviceComponent } from './form-device/form-device.component';
import { Dispositivo } from 'src/app/interfaces/dto/IDispositivo';
import { Route, Router } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';


const ELEMENT_DATA: any[] = [
  {id: 7312,
    nombre: 'DHR=2311',
    parametros:[{parametro:'temperatura',unidad:'fare'},{parametro:'humedad',unidad:'Co'}],
    parametrosProm: [{parametro:'temperatura',valor:80},{parametro:'humedad',valor: 78.2}],
    usuario: 'josue romero,73124086,3',
    cantAlertas: 0,
    description:'descripcion  del dispositivo'
  },

  {id: 7300212,
    nombre: 'DHR=2311',
    parametros:[{parametro:'temperatura',unidad:'fare'},{parametro:'humedad',unidad:'Co'}],
    parametrosProm: [{parametro:'temperatura',valor:80},{parametro:'humedad',valor: 78.2}],
    usuario: 'josue romero,73124086,3',
    cantAlertas: 2,
    description:'descripcion  del dispositivo'
  },
  {id: 9898989,
    nombre: 'DHR=2311',
    parametros:[{parametro:'temperatura',unidad:'fare'},{parametro:'humedad',unidad:'Co'}],
    parametrosProm: [{parametro:'temperatura',valor:80},{parametro:'humedad',valor: 78.2}],
    usuario: 'josue romero,73124086,3',
    cantAlertas: 2,
    description:'descripcion  del dispositivo'
  },
  {id: 11111,
    nombre: 'DHR=2311',
    parametros:[{parametro:'temperatura',unidad:'fare'},{parametro:'humedad',unidad:'Co'}],
    parametrosProm: [{parametro:'temperatura',valor:80},{parametro:'humedad',valor: 78.2}],
    usuario: 'josue romero,73124086,3',
    cantAlertas: 2,
    description:'descripcion  del dispositivo'
  },
  {id: 3443322,
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
  constructor(public dialog: MatDialog, private router:Router,private deviceService: DeviceService){

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
    this.deviceService.listDevices().subscribe(result=>{
      console.log(result)
      this.listaDispositivos = result.data
    })
  }
}
