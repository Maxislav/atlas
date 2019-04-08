import { AfterViewInit, Component, Directive, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, TemplateRef } from '@angular/core';
import * as MAPBOXGL from '../../../libs/mapbox-gl.js';
import { LocalStorage, LocalStorageService } from 'src/app/modules/local-storage/local-storage.service';
import * as mapboxgl from 'mapbox-gl';


@Directive({
  selector: '[mapbox]',
})
export class MapboxDirective implements AfterViewInit {

  @Output() mapbox = new EventEmitter<ElementRef>();

  constructor(private el: ElementRef) {

  }

  ngAfterViewInit() {
    this.mapbox.emit(this.el);
  }
}


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, AfterViewInit {

  private mapboxLs: LocalStorage;
  private mapCenter: { center: { lng: number, lat: number }, zoom: number };
  private mapBoxEl: HTMLElement;

  constructor(private el: ElementRef, private ngZone: NgZone, private localStorageService: LocalStorageService) {
    this.mapboxLs = localStorageService.create('mapbox');
  }

  ngOnInit() {

  }

  onMapboxInit( el: ElementRef) {
    this.mapBoxEl = el.nativeElement;
  }

  ngAfterViewInit(): void {
    this.mapCenter = Object.assign({center: [-74.50, 40], zoom: 9}, this.mapboxLs.getItem('map-center'));
    MAPBOXGL.accessToken = 'pk.eyJ1IjoibWF4aXNsYXYiLCJhIjoiY2lxbmlsNW9xMDAzNmh4bms4MGQ1enpvbiJ9.SvLPN0ZMYdq1FFMn7djryA';
    this.ngZone.runOutsideAngular(() => {
      const {Map} = MAPBOXGL;
      const map: mapboxgl.Map = new Map({
        container: this.mapBoxEl, // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: this.mapCenter.center, // starting position [lng, lat]
        zoom: this.mapCenter.zoom // starting zoom
      });
      map.addControl(new MAPBOXGL.NavigationControl());
      map.on('moveend', (e) => {
        this.mapboxLs.setItem('map-center', {
          center: map.getCenter(),
          zoom: map.getZoom()
        });
      });
    });
  }
}
