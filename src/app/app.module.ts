import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import{ HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './components/feed/feed.component';
import { AsideComponent } from './components/aside/aside.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { CursoComponent } from './components/curso/curso.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
import { LoginAlunoComponent } from './components/login-aluno/login-aluno.component';
import { ForumComponent } from './components/forum/forum.component';
import { NewQuestionComponent } from './components/forum/new-question/new-question.component';
import { FiltroComponent } from './components/forum/filtro/filtro.component';
import { RespostaComponent } from './components/forum/resposta/resposta.component';
import { RankingComponent } from './components/ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    AsideComponent,
    CalendarioComponent,
    ArquivosComponent,
    CursoComponent,
    HomeComponent,
    CadastroAlunoComponent,
    LoginAlunoComponent,
    ForumComponent,
    NewQuestionComponent,
    FiltroComponent,
    RespostaComponent,
    RankingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
