import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {AdventureCamp} from '../domain/model/adventure-camp.entity';
import {ActivityType} from '../domain/model/activity-type';
import {AdventureCampResource, AdventureCampsResponse} from './adventure-camps-response';

/**
 * Maps adventure camp entities to and from API resources.
 *
 * @author Leonardo Lopez Torres
 */
export class AdventureCampAssembler implements BaseAssembler<AdventureCamp, AdventureCampResource, AdventureCampsResponse> {
  /**
   * Converts an AdventureCampsResponse to an array of AdventureCamp entities.
   * @param response - The API response containing adventure camps.
   * @returns An array of AdventureCamp entities.
   */
  toEntitiesFromResponse = (response: AdventureCampsResponse): AdventureCamp[] =>
    response.adventureCamps.map(resource => this.toEntityFromResource(resource as AdventureCampResource));

  /**
   * Converts an AdventureCampResource to an AdventureCamp entity.
   * @param resource - The resource to convert.
   * @returns The converted AdventureCamp entity.
   */
  toEntityFromResource = (resource: AdventureCampResource): AdventureCamp =>
    new AdventureCamp({
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType as ActivityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude
    });

  /**
   * Converts an AdventureCamp entity to an AdventureCampResource.
   * @param entity - The entity to convert.
   * @returns The converted AdventureCampResource.
   */
  toResourceFromEntity = (entity: AdventureCamp): AdventureCampResource =>
    ({
      id: entity.id,
      name: entity.name,
      activityType: entity.activityType,
      capacity: entity.capacity,
      latitude: entity.latitude,
      longitude: entity.longitude
    } as AdventureCampResource);
}
