import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto, UserDto } from '@trip-expense-calculator/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`/api/users`, user);
  }
}
