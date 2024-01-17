import { inject } from '@angular/core';
import { AuthService } from '../services';

export const loggedGuard = () => {
  const auth = inject(AuthService);
  return auth.check() ? true : auth.logout();
};
