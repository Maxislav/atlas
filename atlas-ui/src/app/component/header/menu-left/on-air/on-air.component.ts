import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ngIfAnimation } from 'src/app/animation/animation';

@Component({
  selector: 'app-on-air',
  templateUrl: './on-air.component.html',
  styleUrls: ['./on-air.component.less'],
  animations: [ngIfAnimation]
})
export class OnAirComponent implements OnInit {

  public isMenuShow: boolean;
  public userList: Array<any>;

  constructor(private el: ElementRef) {
    this.userList = [];
    this.isMenuShow = false;
  }

  @HostListener('click', ['$event'])
  onClick(e) {
    this.isMenuShow = true;
  }
  @HostListener('document:click', ['$event'])
  clickOut(e) {
    if (!this.isClickIn(e.target)) {
      this.isMenuShow = false;
    }
  }
  ngOnInit() {
    this.userList.push({
      name: 'InitRobot'
    });
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
