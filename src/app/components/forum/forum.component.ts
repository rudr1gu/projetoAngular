import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Forum } from '../../models/Forum';

import { UserDataServiceService } from '../../services/user-data-service.service';
import { ForumService } from '../../services/forum/forum.service';
import { Alunos } from '../../models/Alunos';
import { Professor } from '../../models/Professor';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})

export class ForumComponent implements OnInit {
  @Input() userData!: Alunos | Professor;

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
      this.forums = data.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());

      this.forums = data.map(forum => {
        forum.createdAt = new Date(forum.createdAt!).toLocaleString('pt-BR');
        return forum;
      });
      
      this.allForums = data;

    });

    this.userDataService.currentUserData.subscribe((userData) => {
      if (userData) {
        this.userData = userData!;
      }
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
      const data = forum;
      data.createdAt = new Date(data.createdAt!).toLocaleString('pt-BR');
      data.respostas = data.respostas!.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());

      this.selectedForum = data;
     });
   }
  }

  applyFilter(filter: { materiaId: number | null, tag: string | null }) {
    const { materiaId, tag } = filter;
    console.log('MateriaId selecionado:', materiaId);
    console.log('TagId selecionado:', tag);
    
    let filteredForums = this.allForums;
  
    if (materiaId !== null) {
      filteredForums = filteredForums.filter(forum => {
        console.log('Fórum atual para filtro:', forum); 
        return forum.materiaId === Number(materiaId); 
      });
    }
  
    if (tag !== null) {
      filteredForums = filteredForums.filter(forum => {
        console.log('Fórum atual:', forum);
        return forum.tags!.some(tags => tags.nome === tag); 
      });
    }
  
    this.forums = filteredForums;
    console.log('Fóruns filtrados:', this.forums);
  }

  deleteForum(forumId: number) {  
    if (!confirm('Tem certeza que deseja excluir este fórum?')) {
      return;
    }

    this.forumService.removeForum(forumId).subscribe(() => {
      this.forums = this.forums.filter(forum => forum.id !== forumId);
    });
  } 
}