import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { CursoComponent } from './components/curso/curso.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
import { LoginAlunoComponent } from './components/login-aluno/login-aluno.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'forum', component: FeedComponent},
  {path:'calendario', component: CalendarioComponent},
  {path: 'arquivos', component: ArquivosComponent},
  {path:'curso', component: CursoComponent},
  {path:'cadastro', component: CadastroAlunoComponent},
  {path:'login', component: LoginAlunoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
