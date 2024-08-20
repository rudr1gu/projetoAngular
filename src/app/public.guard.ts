import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginAlunoService } from './services/login/login-aluno.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginAlunoService);
  const router = inject(Router);

  if(loginService.isAuthenticated()){
    // Se o usuário estiver autenticado, redireciona para a página inicial
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
