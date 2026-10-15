import {inject, Service} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {CurrentWeather} from '../domain/model/current-weather.entity';
import {WeatherApi} from './weather-api';

/**
 * Infrastructure facade for weather provider operations.
 *
 * @author Leonardo Lopez Torres
 */
@Service()
export class WeatherService extends BaseApi {
  private readonly weatherApi = inject(WeatherApi);

  /**
   * Retrieves the current weather for the given coordinates.
   * @param latitude - The latitude of the location.
   * @param longitude - The longitude of the location.
   * @returns An Observable of the CurrentWeather object.
   */
  getCurrentWeather = (latitude: number, longitude: number): Observable<CurrentWeather> =>
    this.weatherApi.getCurrentWeather(latitude, longitude);
}
