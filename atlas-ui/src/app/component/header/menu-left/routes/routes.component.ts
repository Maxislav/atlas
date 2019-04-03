import { Component, HostListener, OnInit } from '@angular/core';
import { ngIfAnimation } from 'src/app/animation/animation';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.less'],
  animations: [ngIfAnimation]
})
export class RoutesComponent implements OnInit {

  public isMenuShow: boolean;
  public menuList = [
    {
      id: 0,
      name: 'History'
    },
    {
      id: 1,
      name: 'Markers'
    }
  ];

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
