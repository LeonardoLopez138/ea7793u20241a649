import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a reservation.
 *
 * @author Leonardo Lopez Torres
 */
export interface ReservationResource extends BaseResource {
  /**
   * The unique identifier for the reservation.
   */
  id: number;

  /**
   * The identifier of the reserved adventure camp.
   */
  adventureCampId: number;

  /**
   * The activity type of the reservation.
   */
  activityType: string;

  /**
   * The name of the participant who made the reservation.
   */
  participantName: string;

  /**
   * The number of attendees.
   */
  participants: number;

  /**
   * The temperature recorded when the reservation was created.
   */
  weatherTemperature: number;

  /**
   * The ISO-8601 date and time the reservation was created.
   */
  reservedAt: string;
}

/**
 * Response envelope for reservation collection queries.
 */
export interface ReservationsResponse extends BaseResponse {
  /**
   * The list of reservations returned by the API.
   */
  reservations: ReservationResource[];
}
