import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateExpenseDto, ExpenseDto } from '@trip-expense-calculator/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  constructor(private http: HttpClient) {}

  createExpense(expense: CreateExpenseDto): Observable<ExpenseDto> {
    return this.http.post<ExpenseDto>(`/api/expenses`, expense);
  }
}
