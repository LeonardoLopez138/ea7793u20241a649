import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {ActivityType} from './activity-type';

/**
 * Represents an adventure camp specialized in a single activity type.
 *
 * @author Leonardo Lopez Torres
 */
export class AdventureCamp implements BaseEntity {
  #id: number;
  #name: string;
  #activityType: ActivityType;
  #capacity: number;
  #latitude: number;
  #longitude: number;

  /**
   * Creates a new adventure camp entity.
   * @param props - Initialization values.
   */
  constructor(props: {
    id: number;
    name: string;
    activityType: ActivityType;
    capacity: number;
    latitude: number;
    longitude: number;
  }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#activityType = props.activityType;
    this.#capacity = props.capacity;
    this.#latitude = props.latitude;
    this.#longitude = props.longitude;
  }

  /** Gets the unique identifier of the camp. */
  get id(): number {
    return this.#id;
  }

  /** Sets the unique identifier of the camp. */
  set id(value: number) {
    this.#id = value;
  }

  /** Gets the name of the camp. */
  get name(): string {
    return this.#name;
  }

  /** Sets the name of the camp. */
  set name(value: string) {
    this.#name = value;
  }

  /** Gets the activity type the camp is specialized in. */
  get activityType(): ActivityType {
    return this.#activityType;
  }

  /** Sets the activity type the camp is specialized in. */
  set activityType(value: ActivityType) {
    this.#activityType = value;
  }

  /** Gets the maximum number of participants. */
  get capacity(): number {
    return this.#capacity;
  }

  /** Sets the maximum number of participants. */
  set capacity(value: number) {
    this.#capacity = value;
  }

  /** Gets the latitude of the camp. */
  get latitude(): number {
    return this.#latitude;
  }

  /** Sets the latitude of the camp. */
  set latitude(value: number) {
    this.#latitude = value;
  }

  /** Gets the longitude of the camp. */
  get longitude(): number {
    return this.#longitude;
  }

  /** Sets the longitude of the camp. */
  set longitude(value: number) {
    this.#longitude = value;
  }
}
