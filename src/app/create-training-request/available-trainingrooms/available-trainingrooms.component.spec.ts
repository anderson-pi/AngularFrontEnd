import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTrainingroomsComponent } from './available-trainingrooms.component';

describe('AvailableTrainingroomsComponent', () => {
  let component: AvailableTrainingroomsComponent;
  let fixture: ComponentFixture<AvailableTrainingroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableTrainingroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTrainingroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
