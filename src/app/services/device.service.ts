import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private endPoint: string='api/device';
  constructor(private http: HttpClient, private deviceService:ApiServicesService) { }


  public listDevices(){
    return this.deviceService.list(this.endPoint+'/list',{
      hearders : new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      })
    })
  }

  public getDeviceById(id:string){
    return this.deviceService.getData(this.endPoint+'/'+id,{
      headers : new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      })
    })
  }

  public getMeasuresDevices(){

  }

  public listItemDevice(data:any){
    return this.deviceService.getItems('api/items/device',data,{
      headers : new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      })
    })
  }

  public uploadData(data:any){
    return this.deviceService.uploadData('api/device/upload',data,{
      headers : new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      })
    })
  }
}
