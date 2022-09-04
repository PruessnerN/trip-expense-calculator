import { Component, Input } from '@angular/core';
import { TripDto, UserDto } from '@trip-expense-calculator/api-interfaces';
import { TripService } from '@trip-expense-calculator/frontend/data-access-trip';

@Component({
  selector: 'tec-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrls: ['./settle-up.component.scss'],
})
export class SettleUpComponent {
  @Input() trip?: TripDto;

  debts: { member: UserDto; amount: number; payTo: UserDto }[] = [];

  constructor(private tripService: TripService) {}

  onCalculateClick(): void {
    if (this.trip) {
      this.tripService.settleUp(this.trip?.id).subscribe((debts) => (this.debts = debts));
    }
  }
}
