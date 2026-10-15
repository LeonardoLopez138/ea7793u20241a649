import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {AdventureCamp} from '../domain/model/adventure-camp.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {AdventureCampsApiEndpoint} from './adventure-camps-api-endpoint';
import {ReservationsApiEndpoint} from './reservations-api-endpoint';

/**
 * Infrastructure facade for adventure camp and reservation endpoint operations.
 *
 * @author Leonardo Lopez Torres
 */
@Service()
export class AdventureCampsService extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly adventureCampsEndpoint = new AdventureCampsApiEndpoint(this.http);
  private readonly reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  /**
   * Retrieves all adventure camps.
   * @returns Stream with the adventure camp collection.
   */
  getAdventureCamps = (): Observable<AdventureCamp[]> =>
    this.adventureCampsEndpoint.getAll();

  /**
   * @param id - The ID of the adventure camp.
   * @returns An Observable of the AdventureCamp object.
   */
  getAdventureCamp = (id: number): Observable<AdventureCamp> =>
    this.adventureCampsEndpoint.getById(id);

  /**
   * Retrieves all reservations.
   * @returns Stream with the reservation collection.
   */
  getReservations = (): Observable<Reservation[]> =>
    this.reservationsEndpoint.getAll();

  /**
   * Retrieves a single reservation by ID.
   * @param id - The ID of the reservation.
   * @returns An Observable of the Reservation object.
   */
  getReservation = (id: number): Observable<Reservation> =>
    this.reservationsEndpoint.getById(id);

  /**
   * Creates a new reservation.
   * @param reservation - The reservation to create.
   * @returns An Observable of the created Reservation object.
   */
  createReservation = (reservation: Reservation): Observable<Reservation> =>
    this.reservationsEndpoint.create(reservation);
}
