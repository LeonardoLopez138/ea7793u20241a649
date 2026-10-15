import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Reservation} from '../domain/model/reservation.entity';
import {ActivityType} from '../domain/model/activity-type';
import {ReservationResource, ReservationsResponse} from './reservations-response';

/**
 * Maps reservation entities to and from API resources.
 *
 * @author Leonardo Lopez Torres
 */
export class ReservationAssembler implements BaseAssembler<Reservation, ReservationResource, ReservationsResponse> {
  /**
   * Converts a ReservationsResponse to an array of Reservation entities.
   * @param response - The API response containing reservations.
   * @returns An array of Reservation entities.
   */
  toEntitiesFromResponse = (response: ReservationsResponse): Reservation[] =>
    response.reservations.map(resource => this.toEntityFromResource(resource as ReservationResource));

  /**
   * Converts a ReservationResource to a Reservation entity.
   * @param resource - The resource to convert.
   * @returns The converted Reservation entity.
   */
  toEntityFromResource = (resource: ReservationResource): Reservation =>
    new Reservation({
      id: resource.id,
      adventureCampId: resource.adventureCampId,
      activityType: resource.activityType as ActivityType,
      participantName: resource.participantName,
      participants: resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt: new Date(resource.reservedAt)
    });

  /**
   * Converts a Reservation entity to a ReservationResource.
   *
   * @remarks
   * The identifier is omitted for new reservations (id equal to zero) so that
   * JSON Server generates it.
   * @param entity - The entity to convert.
   * @returns The converted ReservationResource.
   */
  toResourceFromEntity = (entity: Reservation): ReservationResource =>
    ({
      ...(entity.id ? {id: entity.id} : {}),
      adventureCampId: entity.adventureCampId,
      activityType: entity.activityType,
      participantName: entity.participantName,
      participants: entity.participants,
      weatherTemperature: entity.weatherTemperature,
      reservedAt: entity.reservedAt.toISOString()
    } as ReservationResource);
}
