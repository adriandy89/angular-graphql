// import { inject } from '@angular/core';
// import { AuthService } from '../services';
// import { Router } from '@angular/router';

// export const authGuard = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);
//   return !auth.check() ? true : router.navigateByUrl('/dashboard');
// };

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(auth.check()){
    router.navigateByUrl('/dashboard');
    return false;
  }
  return true;
};
