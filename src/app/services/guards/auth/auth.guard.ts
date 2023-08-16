import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanMatchFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isAuth()
    .pipe(
      tap( state => {
        if (!state) {
          router.navigate(['/auth/login'])
        }
      })
    );
};
