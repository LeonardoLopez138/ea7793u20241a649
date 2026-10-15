import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of an adventure camp.
 *
 * @author Leonardo Lopez Torres
 */
export interface AdventureCampResource extends BaseResource {
  /**
   * The unique identifier for the adventure camp.
   */
  id: number;

  /**
   * The name of the adventure camp.
   */
  name: string;

  /**
   * The activity type the camp is specialized in.
   */
  activityType: string;

  /**
   * The maximum number of participants.
   */
  capacity: number;

  /**
   * The latitude of the camp.
   */
  latitude: number;

  /**
   * The longitude of the camp.
   */
  longitude: number;
}

/**
 * Response envelope for adventure camp collection queries.
 */
export interface AdventureCampsResponse extends BaseResponse {
  /**
   * The list of adventure camps returned by the API.
   */
  adventureCamps: AdventureCampResource[];
}
