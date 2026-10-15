import {Component, computed, inject, signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {AdventureCampsStore} from '../../../application/adventure-camps.store';
import {WeatherStore} from '../../../../weather/application/weather.store';
import {ACTIVITY_TYPES, ActivityType} from '../../../domain/model/activity-type';
import {Reservation} from '../../../domain/model/reservation.entity';

/**
 * Validates that a text value is not empty nor made only of whitespace.
 * @param control - Control to validate.
 * @returns A validation error when the value is blank, otherwise null.
 */
const notBlank = (control: AbstractControl): ValidationErrors | null =>
  typeof control.value === 'string' && control.value.trim().length === 0 ? {blank: true} : null;

/**
 * Reactive form used to register a reservation in an adventure camp.
 *
 * @author Leonardo Lopez Torres
 */
@Component({
  selector: 'app-reservation-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css'
})
export class ReservationForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(AdventureCampsStore);
  private weatherStore = inject(WeatherStore);

  /**
   * Activity types offered by the selector.
   */
  activityTypes = ACTIVITY_TYPES;

  /**
   * Display labels for the activity types.
   */
  readonly activityLabels: Record<ActivityType, string> = {
    hiking: 'Hiking',
    trekking: 'Trekking',
    camping: 'Camping',
    climbing: 'Climbing'
  };

  /**
   * Form-group for the reservation form.
   */
  form = this.fb.group({
    activityType: new FormControl<ActivityType | null>(null, {validators: [Validators.required]}),
    participantName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, notBlank]}),
    participants: new FormControl<number | null>(null, {validators: [Validators.required, Validators.min(1)]})
  });

  private readonly selectedActivityType = signal<ActivityType | null>(null);

  /**
   * Adventure camp resolved from the selected activity type.
   */
  readonly adventureCamp = computed(() => {
    const activityType = this.selectedActivityType();
    return activityType ? this.store.adventureCamps().find(c => c.activityType === activityType) : undefined;
  });

  /**
   * Available capacity of the selected adventure camp.
   */
  readonly availableCapacity = computed(() => {
    const adventureCamp = this.adventureCamp();
    return adventureCamp ? this.store.getAvailableCapacity(adventureCamp.id)() : 0;
  });

  /**
   * Current temperature of the selected adventure camp, or null when unavailable.
   */
  readonly temperature = this.weatherStore.temperature;

  /**
   * Signal indicating if the temperature is being retrieved.
   */
  readonly weatherLoading = this.weatherStore.loading;

  /**
   * Signal for the weather error message.
   */
  readonly weatherError = this.weatherStore.error;

  /**
   * Signal indicating if a reservation is being saved.
   */
  readonly saving = this.store.loading;

  /**
   * Message of the reservation error, or null when there is none.
   */
  readonly reservationError = computed(() => {
    const error = this.store.error();
    if (!error) return null;
    return error.toLowerCase().includes('capacity')
      ? 'The number of participants exceeds the available capacity.'
      : 'The reservation could not be created. Please try again.';
  });

  /**
   * Creates an instance of ReservationForm and reacts to activity type selection.
   */
  constructor() {
    this.weatherStore.reset();
    this.form.controls.activityType.valueChanges.subscribe(activityType => this.onActivityTypeChange(activityType));
  }

  /**
   * Submits the form to create the reservation.
   */
  submit(): void {
    this.form.markAllAsTouched();
    const adventureCamp = this.adventureCamp();
    const temperature = this.temperature();
    if (this.form.invalid || !adventureCamp || temperature === null) return;
    const reservation = new Reservation({
      id: 0,
      adventureCampId: adventureCamp.id,
      activityType: adventureCamp.activityType,
      participantName: this.form.value.participantName!.trim(),
      participants: this.form.value.participants!,
      weatherTemperature: temperature,
      reservedAt: new Date()
    });
    this.store.addReservation(reservation, () => this.router.navigate(['/home']).then());
  }

  /**
   * Returns to the home view without saving.
   */
  cancel(): void {
    this.router.navigate(['/home']).then();
  }

  /**
   * Resolves the camp, queries its weather and updates the participants limit.
   * @param activityType - Selected activity type
   */
  private onActivityTypeChange(activityType: ActivityType | null): void {
    this.selectedActivityType.set(activityType);
    const adventureCamp = this.adventureCamp();
    if (!adventureCamp) {
      this.weatherStore.reset();
      return;
    }
    this.weatherStore.loadCurrentWeather(adventureCamp.latitude, adventureCamp.longitude);
    this.form.controls.participants.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(this.availableCapacity())
    ]);
    this.form.controls.participants.updateValueAndValidity();
  }
}
