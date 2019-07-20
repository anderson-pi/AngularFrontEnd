import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRequestsComponent } from './meeting-requests.component';

describe('MeetingRequestsComponent', () => {
  let component: MeetingRequestsComponent;
  let fixture: ComponentFixture<MeetingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
