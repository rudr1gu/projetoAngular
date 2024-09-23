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
      this.forums = data.map(forum => {
        forum.createdAt = new Date(forum.createdAt!).toLocaleString('pt-BR');

        return forum;
      });

      this.forums = data;
      this.allForums = data;
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

  applyFilter(filter: { materiaId: number | null, tagId: number | null }) {
    const { materiaId, tagId } = filter;
    console.log('MateriaId selecionado:', materiaId);
    console.log('TagId selecionado:', tagId);
  
    this.forums = this.allForums.filter(forum => {
      const matchesMateria = materiaId ? forum.materia.id === materiaId : true;
      const matchesTag = tagId ? forum.materia.tags.some(tag => tag.id === tagId) : true;
  
      console.log(`Analisando fórum: ${forum.titulo} Materias: ${forum.materia.id} Tags:`, forum.materia.tags);
      return matchesMateria && matchesTag;
    });
  
    console.log('Fóruns filtrados:', this.forums);
  }
}