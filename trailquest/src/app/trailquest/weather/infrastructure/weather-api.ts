import {inject, Service} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {CurrentWeather} from '../domain/model/current-weather.entity';
import {WeatherResponse} from './weather-response';
import {WeatherAssembler} from './weather-assembler';

@Service()
/**
 * Infrastructure gateway to the external weather provider API.
 *
 * @remarks
 * The gateway returns domain entities by delegating resource mapping to
 * assembler classes.
 *
 * @author Leonardo Lopez Torres
 */
export class WeatherApi {
  private baseUrl = environment.weatherProviderApiBaseUrl;
  private forecastEndpoint = environment.weatherProviderForecastEndpointPath;
  private http = inject(HttpClient);
  private weatherAssembler = inject(WeatherAssembler);

  /**
   * Fetches the current weather of a location and maps it into a domain entity.
   *
   * @param latitude - Latitude of the location used in the query parameter.
   * @param longitude - Longitude of the location used in the query parameter.
   */
  getCurrentWeather(latitude: number, longitude: number): Observable<CurrentWeather> {
    return this.http.get<WeatherResponse>(`${this.baseUrl}${this.forecastEndpoint}`, {
      params: { latitude, longitude, current: 'temperature_2m' }
    }).pipe(
      map(response => this.weatherAssembler.toEntityFromResponse(response))
    );
  }
}
