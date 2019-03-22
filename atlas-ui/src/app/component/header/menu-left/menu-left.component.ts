import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.less']
})
export class MenuLeftComponent implements OnInit {

  public onAir: boolean;
  constructor() {
    this.onAir = false;
  }

  ngOnInit() {
  }

}
