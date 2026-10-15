import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {CurrentWeather} from '../domain/model/current-weather.entity';
import {WeatherResponse} from './weather-response';
import {WeatherAssembler} from './weather-assembler';

/**
 * Infrastructure gateway to the external weather provider API.
 *
 * @remarks
 * The gateway returns domain entities by delegating resource mapping to
 * assembler classes.
 *
 * @author Leonardo Lopez Torres
 */
@Service()
export class WeatherApi extends ErrorHandlingEnabledBaseType {
  private readonly baseUrl = environment.weatherProviderApiBaseUrl;
  private readonly forecastEndpoint = environment.weatherProviderForecastEndpointPath;
  private readonly http = inject(HttpClient);
  private readonly weatherAssembler = inject(WeatherAssembler);

  /**
   * Fetches the current weather for the given coordinates and maps it into a domain entity.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   * @returns Stream with the mapped current weather.
   */
  getCurrentWeather(latitude: number, longitude: number): Observable<CurrentWeather> {
    return this.http.get<WeatherResponse>(`${this.baseUrl}${this.forecastEndpoint}`, {
      params: {latitude, longitude, current: 'temperature_2m'}
    }).pipe(
      map(response => this.weatherAssembler.toEntityFromResponse(response)),
      catchError(this.handleError('Failed to fetch current weather'))
    );
  }
}
