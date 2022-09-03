import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripComponent, TripsComponent } from '@trip-expense-calculator/frontend/feature-trip';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/trips',
  },
  {
    path: 'trips',
    component: AppComponent,
    children: [
      { path: '', component: TripsComponent },
      { path: ':slug', component: TripComponent },
    ],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
