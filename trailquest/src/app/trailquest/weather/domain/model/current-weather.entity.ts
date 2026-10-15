/**
 * Represents the current weather conditions of a location.
 *
 * @author Leonardo Lopez Torres
 */
export class CurrentWeather {
  #latitude: number;
  #longitude: number;
  #temperature: number;
  #observedAt: string;

  /**
   * Creates a new current weather entity.
   * @param props - Initialization values.
   */
  constructor(props: { latitude: number; longitude: number; temperature: number; observedAt: string }) {
    this.#latitude = props.latitude;
    this.#longitude = props.longitude;
    this.#temperature = props.temperature;
    this.#observedAt = props.observedAt;
  }

  /** Gets the latitude of the observed location. */
  get latitude(): number {
    return this.#latitude;
  }

  /** Sets the latitude of the observed location. */
  set latitude(value: number) {
    this.#latitude = value;
  }

  /** Gets the longitude of the observed location. */
  get longitude(): number {
    return this.#longitude;
  }

  /** Sets the longitude of the observed location. */
  set longitude(value: number) {
    this.#longitude = value;
  }

  /** Gets the current temperature in degrees Celsius. */
  get temperature(): number {
    return this.#temperature;
  }

  /** Sets the current temperature in degrees Celsius. */
  set temperature(value: number) {
    this.#temperature = value;
  }

  /** Gets the ISO-8601 timestamp of the observation. */
  get observedAt(): string {
    return this.#observedAt;
  }

  /** Sets the ISO-8601 timestamp of the observation. */
  set observedAt(value: string) {
    this.#observedAt = value;
  }
}
