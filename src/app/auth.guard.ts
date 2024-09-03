import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginAlunoService } from './services/login/login-aluno.service';
import { LoginProfessorService } from './services/login/login-professor.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginAlunoService = inject(LoginAlunoService);
  const loginProfessorService = inject(LoginProfessorService);
  const router = inject(Router);

  if(loginAlunoService.isAuthenticated() || loginProfessorService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};