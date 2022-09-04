import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTripDto, TripDto, UserDto } from '@trip-expense-calculator/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TripService {
  constructor(private http: HttpClient) {}

  getTrips(): Observable<TripDto[]> {
    return this.http.get<TripDto[]>(`/api/trips`);
  }

  getTrip(slug: string): Observable<TripDto> {
    return this.http.get<TripDto>(`/api/trips/${slug}`);
  }

  createTrip(trip: CreateTripDto): Observable<TripDto> {
    return this.http.post<TripDto>(`/api/trips`, trip);
  }

  settleUp(tripId: string): Observable<{ member: UserDto; amount: number; payTo: UserDto }[]> {
    return this.http.post<{ member: UserDto; amount: number; payTo: UserDto }[]>(
      `/api/trips/settle-up`,
      { tripId },
    );
  }
}
