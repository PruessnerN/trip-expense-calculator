import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTripDto } from '@trip-expense-calculator/api-interfaces';
import { Trip } from '@trip-expense-calculator/backend/tec-api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TripService {
  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`/api/trips`);
  }

  createTrip(trip: CreateTripDto): Observable<Trip> {
    return this.http.post<Trip>(`/api/trips`, trip);
  }
}
