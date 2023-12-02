import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDetailRoomComponent } from './step-detail-room.component';

describe('StepDetailRoomComponent', () => {
  let component: StepDetailRoomComponent;
  let fixture: ComponentFixture<StepDetailRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepDetailRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepDetailRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
