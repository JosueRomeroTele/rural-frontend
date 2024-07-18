import { Component, ViewChild } from '@angular/core';

import { multi } from '../device-detail/data';
import * as moment from 'moment-timezone';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { MatDialog } from '@angular/material/dialog';
import { DragAndDropFileComponent } from 'src/app/components/drag-and-drop-file/drag-and-drop-file.component';
import { ModalUploadFileComponent } from 'src/app/components/modal-upload-file/modal-upload-file.component';
import { Utilitario } from 'src/app/utils/Utilitario';
import { Usuario } from 'src/app/interfaces/dto/IUsuarioDto';
import { DeviceService } from 'src/app/services/device.service';
import { parametrosTiempo } from '../device-detail/dataForm';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { WebsocketService } from 'src/app/services/web-socket/websocket-service.service';
import { Dispositivo } from 'src/app/interfaces/dto/IDispositivo';
import { ActivatedRoute } from '@angular/router';


interface ChartSeries {
  name: string;
  series: { name: string, value: number }[];
}

@Component({
  selector: 'app-dashboard-device',
  templateUrl: './dashboard-device.component.html',
  styleUrls: ['./dashboard-device.component.css']
})
export class DashboardDeviceComponent {

  deviceSerie?: string | null;
  device: Dispositivo | any;
  usuario : Usuario;
  userRol:string='';
  parametrosTiempo = parametrosTiempo;

  chartData: ChartSeries[] = [];

  formParameters = new FormGroup({
    type: new FormControl<number>(1),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    parametros: new FormControl<string[]>([])
  })

  selectedOption : number = -1;
  @ViewChild('select') select!: MatSelect;
  allSelected=false;

  messages: string[] = [];

  // 2024-07-09T16:33:50-05:00 formate de fecha para mandar al backend
  // private websocketService: WebsocketService,
  constructor(private router: ActivatedRoute,private dialog:MatDialog,private deviceService:DeviceService) {



    this.usuario={}

   }

  ngOnInit(): void {
    this.deviceSerie = this.router.snapshot.paramMap.get('serie');
    this.device = {
      serie: '7312',
      nombre: 'DHR=2311',
      tiposParametros: [{ nombre: 'temperatura', unidad: 'Tem' }, { nombre: 'humedad', unidad: 'Co' }],
      usuario: 'josue romero,73124086,3',//nombre, dni, rol
      cantAlertas: 2,
      descripcion: 'descripcion  del dispositivo'
    }
    this.obtenerDataUsuario(this.device.usuario)
    // console.log(this.device)
    this.dataDispositivoIot();
    this.chartData=this.transformDataForChart(multi)
  }



  onSelectionChange(event: any) {
    this.selectedOption = event.value;
  }

  multi: any[]=multi;
  view: [number,number] = [1200, 400];

  colorScheme: Color = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  parseDate(dataRaw: Array<any>): Array<any> {

    const result = dataRaw.map((item) => {
      if (typeof item === 'object' && item.name && item.value) {

        return {
          name: moment.tz(item.name * 1000, 'America/Lima').toDate(),
          value: item.value
        };
      } else {
        console.error('Formato de datos inesperado', item);
        return null;
      }
    }).filter(item => item !== null); // Filtrar los resultados nulos

    return result;
  }


  modalUploadData(){
    this.dialog.open(ModalUploadFileComponent)
  }

  obtenerDataUsuario(dataUser:string){

    const data = dataUser.split(',');
    // console.log(data[0])
    // console.log(data[1])
    // console.log(data[2])
    // this.userRol= Utilitario.getRoleName(Number(data[2]))
    this.usuario.name = data[0]
    this.usuario.lastname = Utilitario.getRoleName(Number(data[2]))
  }

  obtenerRangoMediciones(data:any){
    console.log(data)
    const data2 = {
      type: data.type,
      start: this.convertToISOWithTimezone(data.start),
      end: this.convertToISOWithTimezone(data.end),
      parametros: data.parametros
    };

    console.log(data2)
  }



  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
      const allParams = this.device.tiposParametros.map((op:any) => op.nombre);
      this.formParameters.controls['parametros'].setValue(allParams);
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
      this.formParameters.controls['parametros'].setValue([]);
    }
  }
   optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
    let selectedOptions = this.formParameters.controls['parametros'].value;
    // this.allSelected = selectedOptions.length === this.device.tiposParametros.length;
  }


  // onSelect(data:any): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data:any): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data:any): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }

  dataDispositivoIot(){
    // this.websocketService.getMessages().subscribe((event) => {
    //   this.messages.push(`Mensaje del servidor: ${event.data}`);
    // });

    // this.websocketService.send('Hola servidor!');
  }

  convertToISOWithTimezone(date: Date | null): string | null {
    if (!date) return null;
    return moment(date).tz('America/Lima').format('YYYY-MM-DDTHH:mm:ssZ');
  }

  transformDataForChart(data: any[]): any[] {
    const result : any[] = [];
    const keys = Object.keys(data[0]).filter(key => key !== 'date');

    keys.forEach(key => {
      const series = {
        name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar el nombre
        series: [] as any[]
      };

      data.forEach(item => {
        series.series.push({
          name: item.date,
          value: parseFloat(item[key])
        });
      });

      result.push(series);
    });

    return result;
  }

}
