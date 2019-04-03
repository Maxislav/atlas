import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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

  constructor(private el: ElementRef) {
    this.isMenuShow = false;
  }

  @HostListener('click', ['$event'])
  onClick(e) {
    this.isMenuShow = true;
    // e.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  clickOut(e) {
    if (!this.isClickIn(e.target)) {
      this.isMenuShow = false;
    }
  }

  ngOnInit() {
  }

  private isClickIn(target) {
    if (target === this.el.nativeElement) {
      return true;
    } else if (target.parentNode) {
      return this.isClickIn(target.parentNode);
    }
    return false;
  }
}
