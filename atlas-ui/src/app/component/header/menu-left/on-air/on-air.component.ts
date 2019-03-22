import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-air',
  templateUrl: './on-air.component.html',
  styleUrls: ['./on-air.component.less']
})
export class OnAirComponent implements OnInit {

  public isMenuShow: boolean;

  constructor() {
    this.isMenuShow = false;
  }

  @HostListener('click', ['$event'])
  onClick(e) {
    this.isMenuShow = true;
    e.stopPropagation();
  }
  @HostListener('document:click')
  clickOut() {
    this.isMenuShow = false;
  }
  ngOnInit() {
  }
}
