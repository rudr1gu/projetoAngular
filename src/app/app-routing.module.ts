import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { CursoComponent } from './components/curso/curso.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
import { LoginAlunoComponent } from './components/login-aluno/login-aluno.component';
import { authGuard } from './auth.guard';
import { publicGuard } from './public.guard';
import { ForumComponent } from './components/forum/forum.component';

const routes: Routes = [
  {path:'', component: ForumComponent, canActivate: [authGuard]},
  {path:'feed', component: FeedComponent, canActivate: [authGuard]},
  {path:'calendario', component: CalendarioComponent, canActivate: [authGuard]},
  {path: 'arquivos', component: ArquivosComponent, canActivate: [authGuard]},
  {path:'curso', component: CursoComponent, canActivate: [authGuard]},
  {path:'cadastro', component: CadastroAlunoComponent, canActivate: [publicGuard]},
  {path:'login', component: LoginAlunoComponent, canActivate: [publicGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
