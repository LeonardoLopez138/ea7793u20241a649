import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {AdventureCamp} from '../domain/model/adventure-camp.entity';
import {AdventureCampResource, AdventureCampsResponse} from './adventure-camps-response';
import {AdventureCampAssembler} from './adventure-camp-assembler';
import {environment} from '../../../../environments/environment';

/**
 * Endpoint client for adventure camp CRUD operations.
 *
 * @author Leonardo Lopez Torres
 */
export class AdventureCampsApiEndpoint extends BaseApiEndpoint<AdventureCamp, AdventureCampResource, AdventureCampsResponse, AdventureCampAssembler> {
  /**
   * Creates an instance of AdventureCampsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderAdventureCampsEndpointPath}`,
      new AdventureCampAssembler());
  }
}


