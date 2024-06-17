import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { multi } from './data';
import * as moment from 'moment-timezone';
import { TestComponentRenderer } from '@angular/core/testing';
import { TemplateBindingParseResult } from '@angular/compiler';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  multi: any[]=multi;
  view: [number,number] = [1000, 400];
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Parámetros';
  timeline: boolean = true;

  colorScheme: Color = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  // colorScheme = {
  //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  // };

  constructor() {
    const [temp,hume] = this.multi;
    console.log(multi)
    const tempDate = this.parseDate(temp.series)
    console.log(tempDate)
    const humeDate = this.parseDate(hume.series)

    this.multi[0].series = tempDate;
    this.multi[1].series = humeDate;
    Object.assign(this, { multi });
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  parseDate(dataRaw: Array<any>): Array<any> {
    console.log(dataRaw)
    // Convertir cada objeto en la serie a la estructura deseada
    const result = dataRaw.map((item) => {
      // Asegurarse de que el item es un objeto con las propiedades 'name' y 'value'
      if (typeof item === 'object' && item.name && item.value) {

        console.log(item.name)
        console.log(moment.tz(item.name * 1000, 'America/Lima').toDate())
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

}
