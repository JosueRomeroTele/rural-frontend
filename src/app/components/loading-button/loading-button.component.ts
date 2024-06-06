import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-btn',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent implements OnInit {

  @Input()
  loading: boolean=false;

  @Input()
  text: string='';

  @Input()
  color: string = "primary";

  @Input()
  type: string = "submit";

  @Input()
  disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
