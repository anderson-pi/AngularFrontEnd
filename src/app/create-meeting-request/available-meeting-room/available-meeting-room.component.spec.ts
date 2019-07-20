import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableMeetingRoomComponent } from './available-meeting-room.component';

describe('AvailableMeetingRoomComponent', () => {
  let component: AvailableMeetingRoomComponent;
  let fixture: ComponentFixture<AvailableMeetingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableMeetingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableMeetingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
