import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDto } from '@trip-expense-calculator/api-interfaces';
import { ExpenseService } from '@trip-expense-calculator/frontend/data-access-expense';
import { TripService } from '@trip-expense-calculator/frontend/data-access-trip';
import { UserService } from '@trip-expense-calculator/frontend/data-access-user';
import { ModalService } from '@trip-expense-calculator/frontend/util-shared';
import { Observable, catchError, switchMap, tap } from 'rxjs';

@Component({
  selector: 'trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent {
  trip$: Observable<TripDto>;
  trip?: TripDto;

  expenseForm = new FormGroup({
    member: new FormControl('0', [Validators.required]),
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
    private expenseService: ExpenseService,
    private userService: UserService,
    route: ActivatedRoute,
    tripService: TripService,
    router: Router,
  ) {
    this.trip$ = route.params.pipe(
      switchMap((params) => tripService.getTrip(params['slug'])),
      tap((trip) => (this.trip = trip)),
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
    if (
      this.expenseForm.valid &&
      this.expenseForm.value.name?.trim() !== '' &&
      this.expenseForm.value.value?.trim() !== '' &&
      this.expenseForm.value.member?.trim() !== '' &&
      !!this.trip
    ) {
      this.expenseService
        .createExpense({
          tripId: this.trip?.id,
          userId: this.expenseForm.value.member ?? '',
          name: this.expenseForm.value.name ?? '',
          value: Number(this.expenseForm.value.value ?? 0),
        })
        .subscribe((expense) => {
          this.closeModal('expense-modal');
          this.expenseForm.reset({ member: '0' });
          this.trip?.expenses?.push(expense);
        });
    }
  }

  onSaveMemberClick(): void {
    if (this.memberForm.valid && this.memberForm.value.name?.trim() !== '' && !!this.trip) {
      this.userService
        .createUser({
          tripId: this.trip.id,
          name: this.memberForm.value.name ?? '',
        })
        .subscribe((member) => {
          this.closeModal('member-modal');
          this.memberForm.reset();
          this.trip?.members?.push(member);
        });
    }
  }

  closeModal(id: string) {
    this.expenseForm.reset({ member: '0' });
    this.memberForm.reset();
    this.modalService.close(id);
  }
}
