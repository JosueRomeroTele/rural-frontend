import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit{

  deviceSerie?:string| null;
  device:any;

  constructor(private router: ActivatedRoute){}

  ngOnInit(): void {
      this.deviceSerie = this.router.snapshot.paramMap.get('serie');
  }
}
