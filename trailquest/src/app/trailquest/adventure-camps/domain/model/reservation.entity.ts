import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {ActivityType} from './activity-type';

/**
 * Represents a reservation of participants at an adventure camp.
 *
 * @author Leonardo Lopez Torres
 */
export class Reservation implements BaseEntity {
  #id: number;
  #adventureCampId: number;
  #activityType: ActivityType;
  #participantName: string;
  #participants: number;
  #weatherTemperature: number;
  #reservedAt: Date;

  /**
   * Creates a new reservation entity.
   * @param props - Initialization values.
   */
  constructor(props: {
    id: number;
    adventureCampId: number;
    activityType: ActivityType;
    participantName: string;
    participants: number;
    weatherTemperature: number;
    reservedAt: Date;
  }) {
    this.#id = props.id;
    this.#adventureCampId = props.adventureCampId;
    this.#activityType = props.activityType;
    this.#participantName = props.participantName;
    this.#participants = props.participants;
    this.#weatherTemperature = props.weatherTemperature;
    this.#reservedAt = props.reservedAt;
  }

  /** Gets the unique identifier of the reservation. */
  get id(): number {
    return this.#id;
  }

  /** Sets the unique identifier of the reservation. */
  set id(value: number) {
    this.#id = value;
  }

  /** Gets the identifier of the reserved adventure camp. */
  get adventureCampId(): number {
    return this.#adventureCampId;
  }

  /** Sets the identifier of the reserved adventure camp. */
  set adventureCampId(value: number) {
    this.#adventureCampId = value;
  }

  /** Gets the activity type of the reservation. */
  get activityType(): ActivityType {
    return this.#activityType;
  }

  /** Sets the activity type of the reservation. */
  set activityType(value: ActivityType) {
    this.#activityType = value;
  }

  /** Gets the name of the participant who made the reservation. */
  get participantName(): string {
    return this.#participantName;
  }

  /** Sets the name of the participant who made the reservation. */
  set participantName(value: string) {
    this.#participantName = value;
  }

  /** Gets the number of attendees. */
  get participants(): number {
    return this.#participants;
  }

  /** Sets the number of attendees. */
  set participants(value: number) {
    this.#participants = value;
  }

  /** Gets the temperature recorded when the reservation was created. */
  get weatherTemperature(): number {
    return this.#weatherTemperature;
  }

  /** Sets the temperature recorded when the reservation was created. */
  set weatherTemperature(value: number) {
    this.#weatherTemperature = value;
  }

  /** Gets the date and time the reservation was created. */
  get reservedAt(): Date {
    return this.#reservedAt;
  }

  /** Sets the date and time the reservation was created. */
  set reservedAt(value: Date) {
    this.#reservedAt = value;
  }
}
