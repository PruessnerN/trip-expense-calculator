import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTripDto } from '@trip-expense-calculator/api-interfaces';
import { TripService } from '@trip-expense-calculator/frontend/data-access-trip';

@Component({
  selector: 'tec-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss'],
})
export class CreateTripComponent {
  createTripForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    startDate: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?:[1-9]|0[1-9]|1[0-2])/(?:[0-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])/(?:20[6-9][0-9]|20[0-2][0-9])$',
      ),
    ]),
    endDate: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?:[1-9]|0[1-9]|1[0-2])/(?:[0-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])/(?:20[6-9][0-9]|20[0-2][0-9])$',
      ),
    ]),
  });

  constructor(private tripService: TripService, private router: Router) {}

  onCreateTrip(): void {
    this.createTripForm.markAllAsTouched();

    if (this.createTripForm.valid && this.createTripForm.value.name?.trim() !== '') {
      const trip: CreateTripDto = {
        name: this.createTripForm.value.name ?? '',
        description: this.createTripForm.value.description ?? '',
        startDate: new Date(this.createTripForm.value.startDate ?? '2/22/2022'),
        endDate: new Date(this.createTripForm.value.endDate ?? '2/23/2022'),
      };

      this.tripService
        .createTrip(trip)
        .subscribe((trip) => this.router.navigateByUrl(`trips/${trip.slug}`));
    }
  }
}
