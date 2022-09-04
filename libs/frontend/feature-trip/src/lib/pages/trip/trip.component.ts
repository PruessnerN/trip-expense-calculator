import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripDto } from '@trip-expense-calculator/api-interfaces';
import { TripService } from '@trip-expense-calculator/frontend/data-access-trip';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent {
  trip$: Observable<TripDto>;

  constructor(route: ActivatedRoute, tripService: TripService) {
    this.trip$ = route.params.pipe(switchMap((params) => tripService.getTrip(params['slug'])));
  }

  onAddMemberClick(): void {
    const name = prompt("Please provide the member's name:");
  }

  onAddExpenseClick(): void {
    const name = prompt('Please provide the expense name:');
    const value = prompt('Please provide the expense value:');

    console.log(name, value);
  }
}
