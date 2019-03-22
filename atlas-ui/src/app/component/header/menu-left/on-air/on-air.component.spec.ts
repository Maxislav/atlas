import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnAirComponent } from './on-air.component';

describe('OnAirComponent', () => {
  let component: OnAirComponent;
  let fixture: ComponentFixture<OnAirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnAirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
