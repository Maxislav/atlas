import { AfterViewInit, Component, ElementRef, NgZone, OnInit, TemplateRef } from '@angular/core';
import '../../../libs/mapbox-gl.css';
import * as mapboxgl from '../../../libs/mapbox-gl.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor(private el: ElementRef,  private ngZone: NgZone) {
    console.log(el);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    console.log('rendered');
    this.el.nativeElement.innerHTML = '';
    mapboxgl.accessToken = 'pk.eyJ1IjoibWF4aXNsYXYiLCJhIjoiY2lxbmlsNW9xMDAzNmh4bms4MGQ1enpvbiJ9.SvLPN0ZMYdq1FFMn7djryA';
    this.ngZone.runOutsideAngular(() => {
      const { Map } =  mapboxgl;
      new Map({
        container:  this.el.nativeElement, // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [-74.50, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });
    });
  }

}
