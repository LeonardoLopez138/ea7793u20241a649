import {CurrentWeather} from '../domain/model/current-weather.entity';
import {WeatherResponse} from './weather-response';

/**
 * Maps Open-Meteo weather responses to domain entities.
 *
 * @remarks
 * Weather data is read-only and has no identifier, so this assembler does not
 * implement the identifier-based base assembler contract.
 *
 * @author Leonardo Lopez Torres
 */
export class WeatherAssembler {
  /**
   * Converts a WeatherResponse to a CurrentWeather entity.
   * @param response - The API response containing the current conditions.
   * @returns The converted CurrentWeather entity.
   */
  toEntityFromResponse = (response: WeatherResponse): CurrentWeather =>
    new CurrentWeather({
      latitude: response.latitude,
      longitude: response.longitude,
      temperature: response.current.temperature_2m,
      observedAt: response.current.time
    });
}
