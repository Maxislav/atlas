import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterMenuComponent } from './enter-menu.component';

describe('EnterMenuComponent', () => {
  let component: EnterMenuComponent;
  let fixture: ComponentFixture<EnterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
