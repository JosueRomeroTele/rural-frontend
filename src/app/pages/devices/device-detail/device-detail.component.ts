import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from 'src/app/interfaces/dto/IDispositivo';

import { multi } from './data';
import * as moment from 'moment-timezone';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { MatDialog } from '@angular/material/dialog';
import { DragAndDropFileComponent } from 'src/app/components/drag-and-drop-file/drag-and-drop-file.component';
import { ModalUploadFileComponent } from 'src/app/components/modal-upload-file/modal-upload-file.component';
import { Utilitario } from 'src/app/utils/Utilitario';
import { Usuario } from 'src/app/interfaces/dto/IUsuarioDto';
import { DeviceService } from 'src/app/services/device.service';
import { parametrosTiempo } from './dataForm';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { WebsocketService } from 'src/app/services/web-socket/websocket-service.service';

import { io } from 'socket.io-client';
import { SocketIoService } from 'src/app/services/socket-io/socket-io.service';
interface ChartSeries {
  name: string;
  series: { name: string, value: number }[];
}
interface dataInformativa {
  totalMediciones: number,
  totalAlertas: number,
  ultimaMedicion: string
}

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit, OnDestroy {

  deviceSerie?: string | null;

  device: Dispositivo | null = { usuario: '' };

  usuario: Usuario;
  userRol: string = '';
  parametrosTiempo = parametrosTiempo;

  chartData: ChartSeries[] = [];
  dataInformativa: dataInformativa = { totalAlertas: 150, totalMediciones: 0, ultimaMedicion: '13/07/24 - 14:23:04' };

  formParameters = new FormGroup({
    type: new FormControl<number>(60),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    parametros: new FormControl<string[]>([])
  })

  selectedOption: number = -1;

  @ViewChild('select') select!: MatSelect;
  allSelected = false;

  multi: any[] = multi;
  view: [number, number] = [1200, 400];

  colorScheme: Color = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  messages: string[] = [];
  showDashboard: boolean = false;
  // 2024-07-09T16:33:50-05:00 formate de fecha para mandar al backend
  //


  constructor(private socketIOService: SocketIoService, private router: ActivatedRoute, private dialog: MatDialog, private deviceService: DeviceService) {
    this.usuario = {}
  }

  private socket: any;
  public data: any[] = [];

  ngOnInit(): void {
    this.deviceSerie = this.router.snapshot.paramMap.get('serie');

    //INFO GENERAL
    this.consultarDatosDispositivo(this.deviceSerie!)
    //INFO SOCKET
    // this.socket = io('http://3.228.66.133:3000');

    // this.socket.on('newData', (data: any) => {
    //   this.data.push(data);
    // });
    // this.socketInicio()
    // this.socketIOService.connect();
    // const socket = this.socketIOService.getSocket();
    // console.log('socket : ',socket)
    // if(socket){
    //   socket.on('newData', (data: any) => {
    //     this.data.push(data);
    //   });
    // }
  }

  ngOnDestroy(): void {
    // this.webSocketService.desconectar()
  }

  // socketInicio(){
  //   this.webSocketService.connect().then(() => {
  //     this.webSocketService.sendMessage(this.deviceSerie!);
  //   }).catch((error) => {
  //     console.error('Conexion fallida con el WebSocket :', error);
  //   });
  // }

  consultarDatosDispositivo(tabla: string) {
    this.deviceService.getDeviceById(tabla).subscribe(res => {
      try {
        this.device = res.data
        this.obtenerDataUsuario(this.device!.usuario!)
        this.getDataItemsDevice(this.deviceSerie!)
      } catch (error) {
        console.log(error)
      }
    })

    const dataFormParam = {
      table: tabla,
      type: 60,
      start: '',
      end: '',
    }

  }


  onSelectionChange(event: any) {
    this.selectedOption = event.value;
  }

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


  modalUploadData() {
    this.dialog.open(ModalUploadFileComponent)
  }

  obtenerDataUsuario(dataUser: string) {
    //id,nombre completo,rol(numero)
    const data = dataUser.split(',');
    this.usuario.name = data[1]
    this.usuario.lastname = Utilitario.getRoleName(Number(data[2]))
  }

  obtenerRangoMediciones(data: any) {
    const dataForm = {
      table: this.deviceSerie,
      type: data.type,
      start: this.convertToISOWithTimezone(data.start),
      end: this.convertToISOWithTimezone(data.end),
      parameters: data.parametros
    };

    this.deviceService.listItemDevice(dataForm).subscribe(res => {
      // console.log('respuesta del back list item data')
      // console.log(res)
      if (res.success && res.totalData! > 0) {
        this.showDashboard = true;
        this.dataInformativa.totalMediciones = res.totalData!;
        this.chartData = this.transformDataForChart(res.data);
        // console.log('data que va a grafica')
        // console.log(this.chartData)
      }
    })

  }

  formatXAxisTick(value: any): string {
    return moment(value).format('DD/MM/YY HH:mm');
  }

  ngAfterViewInit() {
    // Este método se ejecuta después de que la vista se inicialice completamente
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
      const allParams = this.device!.tipoDatos!.map((op: any) => op.nombre);
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


  dataDispositivoIot() {
    // this.websocketService.connect();
    // this.websocketService.sendMessage('Hello Server!');
    // /if(conectado) this.websocketService.send('hola servidor');

    // this.websocketService.send('Hola servidor!');

    // this.websocketService.getMessages().subscribe((event) => {
    //   this.messages.push(`Mensaje del servidor: ${event.data}`);
    // });


  }

  getDataItemsDevice(tabla: string) {
    this.allSelected = true;
    // console.log(this.device?.tipoDatos)
    const allParams = this.device!.tipoDatos!.map((op: any) => op.nombre);
    this.formParameters.controls['parametros'].setValue(allParams);
    this.formParameters.controls['type'].setValue(60)
    const data = {
      table: tabla,
      type: this.formParameters.value.parametros,
      start: this.formParameters.value.start,
      end: this.formParameters.value.end,
      parameters: this.formParameters.value.parametros
    }
    // console.log('probando')
    // console.log(tabla)
    // console.log(data)
    this.deviceService.listItemDevice(data).subscribe(res => {
      // console.log('respuesta dell back')
      // console.log(res)
      if (res.success) {

      }
    })
    this.showDashboard = true
    // this.chartData = this.transformDataForChart(multi)
    this.chartData = multi

  }

  convertToISOWithTimezone(date: Date | null): string | null {
    if (!date) return null;
    return moment(date).tz('America/Lima').format('YYYY-MM-DDTHH:mm:ssZ');
  }

  transformDataForChart(data: any[]): any[] {
    const result: any[] = [];
    const keys = Object.keys(data[0]).filter(key => key !== 'date');

    keys.forEach(key => {
      const series = {
        name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar el nombre
        series: [] as any[]
      };

      data.forEach(item => {
        series.series.push({
          name: moment.tz(item.date, 'America/Lima').toDate(),
          value: parseFloat(item[key])
        });
      });

      result.push(series);
    });

    return result;
  }

}
