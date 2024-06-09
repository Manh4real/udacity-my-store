import { HttpContextToken } from '@angular/common/http';
import { environment } from '../../environment';

export const RouteConstants = {
  API_BASE_URL: environment.API_BASE_URL,
};
export const IGNORE_AUTH = new HttpContextToken(() => false);
