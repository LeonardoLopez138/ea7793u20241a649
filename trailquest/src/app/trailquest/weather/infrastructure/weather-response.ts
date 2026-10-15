import {BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Current conditions block of the Open-Meteo forecast response.
 *
 * @author Leonardo Lopez Torres
 */
export interface CurrentWeatherResource {
  /**
   * ISO-8601 timestamp of the observation.
   */
  time: string;

  /**
   * Update interval in seconds.
   */
  interval: number;

  /**
   * Air temperature at 2 meters above ground, in degrees Celsius.
   */
  temperature_2m: number;
}

/**
 * Response returned by the Open-Meteo forecast endpoint.
 */
export interface WeatherResponse extends BaseResponse {
  /**
   * Latitude of the resolved grid cell.
   */
  latitude: number;

  /**
   * origin
   * Longitude of the resolved grid cell.
   */
  longitude: number;

  /**
   * The current weather conditions.
   */
  current: CurrentWeatherResource;
}
