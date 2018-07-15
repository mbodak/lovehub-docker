import { AuthErrorHandlerService } from '../services/auth-error-handler.service';
import { CustomHttpClient } from './custom-http-client';
import { HttpHandler } from '@angular/common/http';

export function providerCustomHttpClient(handler: HttpHandler, authErrorHandlerService: AuthErrorHandlerService) {
  return new CustomHttpClient(handler, authErrorHandlerService);
}
