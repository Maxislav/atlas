import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/service/user.service';
import { ngIfAnimation } from 'src/app/animation/animation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  animations: [ngIfAnimation]
})
export class UserComponent {

  public user: User;
  public isMenuShow: boolean;

  constructor(private el: ElementRef, private userService: UserService) {
    this.user = userService.user;
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
  private isClickIn(target) {
    if (target === this.el.nativeElement) {
      return true;
    } else if (target.parentNode) {
      return this.isClickIn(target.parentNode);
    }
    return false;
  }

}
