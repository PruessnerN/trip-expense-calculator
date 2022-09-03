import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateTripComponent } from './pages/trips/components/create-trip/create-trip.component';
import { TripsComponent } from './pages/trips/trips.component';

@NgModule({
  declarations: [TripsComponent, CreateTripComponent],
  imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule],
  exports: [TripsComponent],
})
export class TripModule {}