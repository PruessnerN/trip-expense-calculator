import { Component, Input } from '@angular/core';
import { TripDto } from '@trip-expense-calculator/api-interfaces';

@Component({
  selector: 'tec-trip-selection',
  templateUrl: './trip-selection.component.html',
  styleUrls: ['./trip-selection.component.scss'],
})
export class TripSelectionComponent {
  @Input() trip: TripDto;
}
