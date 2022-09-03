import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSelectionComponent } from './trip-selection.component';

describe('TripSelectionComponent', () => {
  let component: TripSelectionComponent;
  let fixture: ComponentFixture<TripSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
