import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DataAuthService } from '../services/data-auth.service';
import { inject } from '@angular/core';

export const onlyadminGuard: CanActivateFn = (route, state) => {
    const dataAuthService = inject(DataAuthService);
    const router = inject(Router)
  
    if (dataAuthService.user?.isAdmin) return true;
    const url = router.parseUrl('/converter');
    return new RedirectCommand(url);
  };