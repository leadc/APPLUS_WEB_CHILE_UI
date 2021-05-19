import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderContainerComponent } from './preloader-container.component';

describe('PreloaderContainerComponent', () => {
  let component: PreloaderContainerComponent;
  let fixture: ComponentFixture<PreloaderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloaderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
