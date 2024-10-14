import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../services/ranking/aluno.service';
import { Alunos } from '../../models/Alunos';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit {
  alunos!: Alunos[];

  constructor(
    private alunosService: AlunoService
  ) { }

  ngOnInit(): void {
    this.alunosService.getAllAlunos().subscribe((alunos) => {
      alunos.data.sort((a, b) => {
        return b.estrelas! - a.estrelas!;
      });

      this.alunos = alunos.data;
      console.table(this.alunos);
    });
   
  }

}
