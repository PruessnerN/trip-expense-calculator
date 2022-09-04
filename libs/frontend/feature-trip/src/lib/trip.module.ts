import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@trip-expense-calculator/frontend/util-shared';

import { TripComponent } from './pages/trip/trip.component';
import { CreateTripComponent } from './pages/trips/components/create-trip/create-trip.component';
import { TripSelectionComponent } from './pages/trips/components/trip-selection/trip-selection.component';
import { TripsComponent } from './pages/trips/trips.component';
import { SettleUpComponent } from './pages/trip/components/settle-up/settle-up.component';

@NgModule({
  declarations: [TripsComponent, CreateTripComponent, TripSelectionComponent, TripComponent, SettleUpComponent],
  imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule, RouterModule, SharedModule],
  exports: [TripsComponent],
})
export class TripModule {}
