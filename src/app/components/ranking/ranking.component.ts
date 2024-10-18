import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../services/ranking/aluno.service';
import { Alunos } from '../../models/Alunos';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit {
  alunos!: Alunos[];
  baseApi = environment.baseApiUrl;
  imgDefault = 'https://www.gravatar.com/avatar/';



  constructor(
    private alunosService: AlunoService
  ) { }

  ngOnInit(): void {
    this.alunosService.getAllAlunos().subscribe((alunos) => {
      alunos.data.sort((a, b) => {
        return b.estrelas! - a.estrelas!;
      });

      this.alunos = alunos.data;
    });
  }

  getAlunoImage(img: string | null | undefined): string {
    if (!img) {
      return this.imgDefault;
    }
    return `${this.baseApi}uploads/${img}`; 
  }

}
