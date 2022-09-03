import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@trip-expense-calculator/api-interfaces';

@Component({
  selector: 'trip-expense-calculator-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/healthCheck');
  constructor(private http: HttpClient) {}
}
