import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginAlunoService } from './services/login/login-aluno.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginAlunoService);
  const router = inject(Router);

  if(loginService.isAuthenticated()){
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};