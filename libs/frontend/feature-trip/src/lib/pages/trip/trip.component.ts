import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDto } from '@trip-expense-calculator/api-interfaces';
import { TripService } from '@trip-expense-calculator/frontend/data-access-trip';
import { ModalService } from '@trip-expense-calculator/frontend/util-shared';
import { Observable, catchError, switchMap } from 'rxjs';

@Component({
  selector: 'trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent {
  trip$: Observable<TripDto>;

  expenseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\$?[0-9]+(\.[0-9][0-9])?$/),
    ]),
  });

  memberForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private modalService: ModalService,
    route: ActivatedRoute,
    tripService: TripService,
    router: Router,
  ) {
    this.trip$ = route.params.pipe(
      switchMap((params) => tripService.getTrip(params['slug'])),
      catchError((error) => {
        router.navigateByUrl('/404');
        throw new Error(error.message);
      }),
    );
  }

  onAddMemberClick(): void {
    this.modalService.open('member-modal');
  }

  onAddExpenseClick(): void {
    this.modalService.open('expense-modal');
  }

  onSaveExpenseClick(): void {
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value);
      this.closeModal('expense-modal');
      this.expenseForm.reset();
    }
  }

  onSaveMemberClick(): void {
    if (this.memberForm.valid) {
      console.log(this.memberForm.value);
      this.closeModal('member-modal');
      this.memberForm.reset();
    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
