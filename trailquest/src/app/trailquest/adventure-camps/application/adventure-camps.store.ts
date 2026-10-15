import {computed, inject, Service, Signal, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry, switchMap, throwError} from 'rxjs';
import {AdventureCamp} from '../domain/model/adventure-camp.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {ActivityType} from '../domain/model/activity-type';
import {AdventureCampsService} from '../infrastructure/adventure-camps.service';

/**
 * Holds adventure camps application state and coordinates adventure camp/reservation application layer behavior.
 *
 * @author Leonardo Lopez Torres
 */
@Service()
export class AdventureCampsStore {
  private readonly adventureCampsService = inject(AdventureCampsService);

  /**
   * Computed signal for the count of adventure camps.
   */
  readonly adventureCampCount = computed(() => this.adventureCamps().length);

  /**
   * Computed signal for the count of reservations.
   */
  readonly reservationCount = computed(() => this.reservations().length);

  private readonly adventureCampsSignal = signal<AdventureCamp[]>([]);

  /**
   * Readonly signal for the list of adventure camps.
   */
  readonly adventureCamps = this.adventureCampsSignal.asReadonly();

  private readonly reservationsSignal = signal<Reservation[]>([]);

  /**
   * Readonly signal for the list of reservations.
   */
  readonly reservations = this.reservationsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Creates an instance of AdventureCampsStore and loads initial data.
   */
  constructor() {
    this.loadAdventureCamps();
    this.loadReservations();
  }

  /**
   * Selects an adventure camp by identifier.
   * @param id - Adventure camp identifier.
   * @returns Reactive selection for the requested adventure camp.
   */
  getAdventureCampById = (id: number): Signal<AdventureCamp | undefined> =>
    computed(() => id ? this.adventureCamps().find(c => c.id === id) : undefined);

  /**
   * Selects the adventure camp specialized in an activity type.
   * @param activityType - Activity type of the camp.
   * @returns Reactive selection for the requested adventure camp.
   */
  getAdventureCampByActivityType = (activityType: ActivityType): Signal<AdventureCamp | undefined> =>
    computed(() => this.adventureCamps().find(c => c.activityType === activityType));

  /**
   * Selects the reservations of an adventure camp.
   * @param adventureCampId - Adventure camp identifier.
   * @returns Reactive selection for the camp reservations.
   */
  getReservationsByAdventureCampId = (adventureCampId: number): Signal<Reservation[]> =>
    computed(() => this.reservations().filter(r => r.adventureCampId === adventureCampId));

  /**
   * Computes the total participants registered in an adventure camp.
   * @param adventureCampId - Adventure camp identifier.
   * @returns Reactive total of participants.
   */
  getTotalParticipants = (adventureCampId: number): Signal<number> =>
    computed(() => this.sumParticipants(this.reservations(), adventureCampId));

  /**
   * Computes the available capacity of an adventure camp.
   * @param adventureCampId - Adventure camp identifier.
   * @returns Reactive available capacity.
   */
  getAvailableCapacity = (adventureCampId: number): Signal<number> =>
    computed(() => {
      const adventureCamp = this.adventureCamps().find(c => c.id === adventureCampId);
      return adventureCamp ? adventureCamp.capacity - this.sumParticipants(this.reservations(), adventureCampId) : 0;
    });

  /**
   * Adds a new reservation.
   *
   * @remarks
   * Reservations are queried again and the available capacity is recalculated
   * before the creation request is sent.
   * @param reservation - The reservation to add.
   * @param onSuccess - Optional callback executed after the reservation has been saved.
   */
  addReservation = (reservation: Reservation, onSuccess?: () => void): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.adventureCampsService.getReservations().pipe(
      switchMap(reservations => {
        this.reservationsSignal.set(reservations);
        const adventureCamp = this.adventureCamps().find(c => c.id === reservation.adventureCampId);
        if (!adventureCamp) {
          return throwError(() => new Error('Adventure camp not found'));
        }
        const availableCapacity = adventureCamp.capacity - this.sumParticipants(reservations, adventureCamp.id);
        if (!Number.isInteger(reservation.participants) || reservation.participants <= 0 || reservation.participants > availableCapacity) {
          return throwError(() => new Error('Participants must be greater than zero and not exceed the available capacity'));
        }
        return this.adventureCampsService.createReservation(reservation).pipe(retry(2));
      })
    ).subscribe({
      next: createdReservation => {
        this.reservationsSignal.update(reservations => [...reservations, createdReservation]);
        this.loadingSignal.set(false);
        onSuccess?.();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create reservation'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Loads all adventure camps from the API.
   */
  private loadAdventureCamps = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.adventureCampsService.getAdventureCamps().pipe(takeUntilDestroyed()).subscribe({
      next: adventureCamps => {
        this.adventureCampsSignal.set(adventureCamps);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load adventure camps'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Loads all reservations from the API.
   */
  private loadReservations = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.adventureCampsService.getReservations().pipe(takeUntilDestroyed()).subscribe({
      next: reservations => {
        this.reservationsSignal.set(reservations);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load reservations'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Sums the participants of the reservations that belong to an adventure camp.
   * @param reservations - Reservations to inspect.
   * @param adventureCampId - Adventure camp identifier.
   * @returns Total participants.
   */
  private sumParticipants = (reservations: Reservation[], adventureCampId: number): number =>
    reservations
      .filter(r => r.adventureCampId === adventureCampId)
      .reduce((total, r) => total + r.participants, 0);

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  };
}
