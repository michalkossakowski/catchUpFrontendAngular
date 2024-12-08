import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  // inject the authService and router
  const authService = inject(AuthService);
  const router = inject(Router);

  // check the login status
  if (authService.checkLoginStatus()) {
    return true; // allow access
  }

  // Redirect to login if not auth-ed
  router.navigate(['']);
  return false;
};
