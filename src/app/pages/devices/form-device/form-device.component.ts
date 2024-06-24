import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataIot } from 'src/app/interfaces/dto/IDataIot';
import { Dispositivo } from 'src/app/interfaces/dto/IDispositivo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-form-device',
  templateUrl: './form-device.component.html',
  styleUrls: ['./form-device.component.css']
})
export class FormDeviceComponent implements OnInit {

  tipo:number;
  device : Dispositivo;



  name: string = '';
  unit: string = '';
  units: string[] = ['Celsius', 'Fahrenheit', 'Kelvin'];
  loading:boolean=false;
  deviceForm = this.fb.group({
    nombre: new FormControl('',Validators.required),
    serie: new FormControl('',Validators.required),
    parametros : this.fb.array([
      this.fb.group({
        nombre:new FormControl(''),
        unidad:new FormControl('')
      })
    ])
  });

  parametroForm=this.fb.group({
    nombre:new FormControl(''),
    unidad:new FormControl('')
  });

  constructor( @Inject(MAT_DIALOG_DATA) private data:any, private fb:FormBuilder){
    this.tipo =  data.tipo
    this.device = {} as Dispositivo;
  }

  ngOnInit(): void {
  }

  get parametros (){
    return this.deviceForm.controls['parametros'] as FormArray;
  }

  addParametro(){
    this.parametros.push(this.parametroForm)
  }

  deleteParametro(parametroIndex:number){
    this.parametros.removeAt(parametroIndex)
  }


  registarDispositivo(){
    console.log(this.deviceForm.value)
  }


}
