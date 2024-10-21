import { Component, Input, OnInit, Renderer2 } from '@angular/core';
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
  isLoading: boolean = true;
  imgDefault = 'https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek=';

  apiUrl = environment.baseApiUrl;

  forums: Forum[] = [];
  allForums: Forum[] = [];

  isAluno: boolean = false;
  isProfessor: boolean = false;

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
    private userDataService: UserDataServiceService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.forumService.getAllForums().subscribe((items) => {
      const data = items;
      // console.table(data);
      this.forums = data.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());

      this.forums = data.map(forum => {
        forum.createdAt = new Date(forum.createdAt!).toLocaleString('pt-BR');
        return forum;
      });
      
      this.allForums = data;
      this.isLoading = false;

    });

    this.userDataService.currentUserData.subscribe((userData) => {
      if (userData) {
        this.userData = userData!;
      }
    });

    if (localStorage.getItem('userType') === 'aluno') {
      this.isAluno = true;
    } else if (localStorage.getItem('userType') === 'professor') {
      this.isProfessor = true;
    }

  }

  showForm() {
    this.newQuestion = !this.newQuestion;
    this.toggleBodyScroll(this.newQuestion);
  }

  showFilter() {
    this.showFiltro = !this.showFiltro;
    this.toggleBodyScroll(this.showFiltro);
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
    // console.log('MateriaId selecionado:', materiaId);
    // console.log('TagId selecionado:', tag);
    
    let filteredForums = this.allForums;
  
    if (materiaId !== null) {
      filteredForums = filteredForums.filter(forum => {
        // console.log('Fórum atual para filtro:', forum); 
        return forum.materiaId === Number(materiaId); 
      });
    }
  
    if (tag !== null) {
      filteredForums = filteredForums.filter(forum => {
        // console.log('Fórum atual:', forum);
        return forum.tags!.some(tags => tags.nome === tag); 
      });
    }
  
    this.forums = filteredForums;
    // console.log('Fóruns filtrados:', this.forums);
  }

  deleteForum(forumId: number) {  
    if (!confirm('Tem certeza que deseja excluir este fórum?')) {
      return;
    }

    this.forumService.removeForum(forumId).subscribe(() => {
      this.forums = this.forums.filter(forum => forum.id !== forumId);
    });
  }

  toggleBodyScroll(disable: boolean) {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      if (disable) {
        this.renderer.setStyle(mainElement, 'overflow', 'hidden');
      } else {
        this.renderer.removeStyle(mainElement, 'overflow');
      }
    }
  }
}