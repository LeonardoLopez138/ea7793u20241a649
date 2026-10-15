import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Reservation} from '../domain/model/reservation.entity';
import {ReservationResource, ReservationsResponse} from './reservations-response';
import {ReservationAssembler} from './reservation-assembler';
import {environment} from '../../../../environments/environment';

/**
 * Endpoint client for reservation CRUD operations.
 *
 * @author Leonardo Lopez Torres
 */
export class ReservationsApiEndpoint extends BaseApiEndpoint<Reservation, ReservationResource, ReservationsResponse, ReservationAssembler> {
  /**
   * Creates an instance of ReservationsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderReservationsEndpointPath}`,
      new ReservationAssembler());
  }
}
