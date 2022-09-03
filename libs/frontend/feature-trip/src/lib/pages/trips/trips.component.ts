import { Component, OnInit } from '@angular/core';
import { Trip } from '@trip-expense-calculator/backend/tec-api';
import { TripService } from '@trip-expense-calculator/frontend/data-access-trip';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'tec-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  trips$: Observable<Trip[]>;
  trips?: Trip[];

  constructor(tripService: TripService) {
    this.trips$ = tripService.getTrips().pipe(tap((trips) => (this.trips = trips)));
  }

  ngOnInit(): void {
    this.trips$.subscribe();
  }
}
