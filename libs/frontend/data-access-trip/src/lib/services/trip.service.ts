import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTripDto, TripDto } from '@trip-expense-calculator/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TripService {
  constructor(private http: HttpClient) {}

  getTrips(): Observable<TripDto[]> {
    return this.http.get<TripDto[]>(`/api/trips`);
  }

  createTrip(trip: CreateTripDto): Observable<TripDto> {
    return this.http.post<TripDto>(`/api/trips`, trip);
  }
}
