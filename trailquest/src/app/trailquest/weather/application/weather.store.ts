import {computed, inject, Service, signal} from '@angular/core';
import {CurrentWeather} from '../domain/model/current-weather.entity';
import {WeatherService} from '../infrastructure/weather.service';

/**
 * Holds weather application state and coordinates current weather queries.
 *
 * @author Leonardo Lopez Torres
 */
@Service()
export class WeatherStore {
  private readonly weatherService = inject(WeatherService);

  private readonly currentWeatherSignal = signal<CurrentWeather | null>(null);

  /**
   * Readonly signal for the last successfully loaded current weather.
   */
  readonly currentWeather = this.currentWeatherSignal.asReadonly();

  /**
   * Computed signal with the current temperature, or null when it is not available.
   */
  readonly temperature = computed(() => this.currentWeather()?.temperature ?? null);

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Loads the current weather for the given coordinates.
   *
   * @remarks
   * On failure the previous weather is discarded so that no stale or fictitious
   * temperature can be used.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   */
  loadCurrentWeather = (latitude: number, longitude: number): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.currentWeatherSignal.set(null);
    this.weatherService.getCurrentWeather(latitude, longitude).subscribe({
      next: weather => {
        this.currentWeatherSignal.set(weather);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load current weather'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Clears the weather state.
   */
  reset = (): void => {
    this.currentWeatherSignal.set(null);
    this.errorSignal.set(null);
    this.loadingSignal.set(false);
  };

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  };
}
