import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligatoryLoginComponent } from './obligatory-login.component';

describe('ObligatoryLoginComponent', () => {
  let component: ObligatoryLoginComponent;
  let fixture: ComponentFixture<ObligatoryLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObligatoryLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObligatoryLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
