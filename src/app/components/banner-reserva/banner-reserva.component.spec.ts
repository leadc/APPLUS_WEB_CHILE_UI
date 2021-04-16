import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerReservaComponent } from './banner-reserva.component';

describe('BannerReservaComponent', () => {
  let component: BannerReservaComponent;
  let fixture: ComponentFixture<BannerReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
