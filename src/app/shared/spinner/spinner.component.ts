import {Component, Input, OnDestroy, ViewEncapsulation, OnInit} from '@angular/core';
import {Spinkit} from './spinkits';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: [
        './spinner.component.css',
        './spinkit-css/sk-double-bounce.css',
        './spinkit-css/sk-chasing-dots.css',
        './spinkit-css/sk-cube-grid.css',
        './spinkit-css/sk-rotating-plane.css',
        './spinkit-css/sk-spinner-pulse.css',
        './spinkit-css/sk-three-bounce.css',
        './spinkit-css/sk-wandering-cubes.css',
        './spinkit-css/sk-wave.css',
        './spinkit-css/sk-line-material.css'
    ],
    encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy, OnInit {
    public isSpinnerVisible: boolean;
    public Spinkit = Spinkit;
    @Input() public backgroundColor = '#1a91bc';
    @Input() public spinner = Spinkit.skChasingDots;
    
    constructor() {
        this.isSpinnerVisible = true;
    }

    ngOnInit(): void {

    }
    

    ngOnDestroy(): void {
        this.isSpinnerVisible = false;
    }
}
