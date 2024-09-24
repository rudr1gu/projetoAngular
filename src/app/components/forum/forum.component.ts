import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Forum } from '../../models/Forum';

import { UserDataServiceService } from '../../services/user-data-service.service';
import { ForumService } from '../../services/forum/forum.service';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})

export class ForumComponent implements OnInit {
  newQuestion: boolean = false;
  showFiltro: boolean = false;
  showRespostas: boolean = false;

  apiUrl = environment.baseApiUrl;

  forums: Forum[] = [];
  allForums: Forum[] = [];

  selectedForum: Forum = {
    id: 0,
    titulo: '',
    descricao: '',
    aluno: {
      id: 0,
      nome: '',
      email: '',
      senha: '',
      rg: '',
      cpf: '',
      matricula: '',
      data_nascimento: '',
      telefone: '',
      cursoId: 0,
      genero: '',
      img: '',
      createdAt: '',
      updatedAt: ''
    },
    respostas: [],
    createdAt: '',
    alunoId: 0,
    materiaId: 0,
    materia: {
      id: 0,
      nome: '',
      descricao: '',
      cursoId: 0,
      tags: [],
    }
  };
  
  selectedForumId!: number;

  constructor(
    private forumService: ForumService,
    private userDataService: UserDataServiceService
  ) { }

  ngOnInit(): void {
    this.forumService.getAllForums().subscribe((items) => {
      const data = items;
      console.log('Fóruns carregados:', data);
      this.forums = data.map(forum => {
        forum.createdAt = new Date(forum.createdAt!).toLocaleString('pt-BR');
        return forum;
      });
      
      this.allForums = data;
      console.log('Todos os fóruns:', this.allForums);

    });

  }

  showForm() {
    this.newQuestion = !this.newQuestion;
  }

  showFilter() {
    this.showFiltro = !this.showFiltro;
  }

  showAnswers(forumId: number) {
   this.selectedForumId = forumId;
   this.showRespostas = !this.showRespostas;

   if (this.showRespostas) {
     this.forumService.getForum(forumId).subscribe((forum) => {
       this.selectedForum = forum;
       console.log('Forum selecionado:', this.selectedForum);
     });
   }
  }

  applyFilter(filter: { materiaId: number | null, tag: string | null }) {
    const { materiaId, tag } = filter;
    console.log('MateriaId selecionado:', materiaId);
    console.log('TagId selecionado:', tag);
    
    let filteredForums = this.allForums; // Supondo que this.allForums contém todos os fóruns
  
    if (materiaId !== null) {
      filteredForums = filteredForums.filter(forum => {
        console.log('Fórum atual para filtro:', forum); // Log para depuração
        return forum.materiaId === Number(materiaId); // Verifica se o materiaId do fórum corresponde ao filtro
      });
    }
  
    if (tag !== null) {
      filteredForums = filteredForums.filter(forum => {
        console.log('Fórum atual:', forum); // Log para depuração
        return forum.tags!.some(tags => tags.nome === tag); // Verifica se alguma tag do fórum corresponde ao tagId
      });
    }
  
    this.forums = filteredForums; // Atualiza os fóruns filtrados
    console.log('Fóruns filtrados:', this.forums);
  }
  
  
  
  
}