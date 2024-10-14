import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Resposta } from '../../../models/Resposta';
import { ForumService } from '../../../services/forum/forum.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataServiceService } from '../../../services/user-data-service.service';
import { Alunos } from '../../../models/Alunos';
import { Professor } from '../../../models/Professor';
import { Forum } from '../../../models/Forum';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrls: ['./resposta.component.css'],
  animations: [
    [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(100%)' 
      })),
      transition('out => in', [
        animate('300ms ease-in') 
      ]),
      transition('in => out', [
        animate('300ms ease-out') 
      ])
    ])
  ], [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
]
})

export class RespostaComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter();
  @Input() userData!: Alunos | Professor;
  @Input() forum?: Forum;
  @Input() forumId!: number;
  @Input() respostas!: Resposta[];
  @Input() selectedForum!: Forum;

  selectedFile?: File;

  apiUrl = environment.baseApiUrl;

  respostaForm!: FormGroup;

  imgDefault = 'https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek=';

  isAluno: boolean = false;
  isProfessor: boolean = false;
  isCreated: boolean = false;
  isStar: boolean = false;

  constructor(
    private forumservice: ForumService,
    private userDataService: UserDataServiceService,
    private route: ActivatedRoute
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if((changes['forumId'] && this.forumId) || (changes['respostas'] && this.respostas) && this.userData) {
      this.verificarEstrelaDoada();
    }
    if ((changes['userData'] && this.userData) && this.forumId) {
      this.verificarEstrelaDoada();
    }
  }

  ngOnInit(): void {
    this.respostas.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());

    this.userDataService.currentUserData.subscribe((userData) => {
      if (userData) {
        this.userData = userData!;
      }
    });    

    this.respostaForm = new FormGroup({
      resposta: new FormControl('', Validators.required),
    });

    if (localStorage.getItem('userType') === 'aluno') {
      this.isAluno = true;
    } else {
      this.isProfessor = true;
    }

    if (this.forum?.alunoId === this.userData.id) {
      this.isCreated = true;
    }
  }

  verificarEstrelaDoada(): void {
    const estrelaDoadaKey = `estrelaDoada_${this.forumId}_${this.userData.id}`;
    const estrelaDoada = localStorage.getItem(estrelaDoadaKey);
    this.isStar = (estrelaDoada === 'true');
    
    // Adicionar logs para depuração
    console.log(`Chave estrelaDoada: ${estrelaDoadaKey}, valor: ${estrelaDoada}`);
    console.log(`isStar após verificar localStorage: ${this.isStar}`);
  }

  isSetStar(): boolean {
    return localStorage.getItem(`estrelaDoada_${this.forumId}_${this.userData.id}`) === 'true';
  }  

  adicionarResposta() {
    if (!this.respostaForm.valid) {
      return;
    }
  
    const formData = new FormData();
    formData.append('resposta', this.respostaForm.get('resposta')!.value);
    formData.append('forumId', this.forumId.toString());

    if( localStorage.getItem('userType') === 'aluno') {
      formData.append('alunoId', this.userData.id.toString());
    } else {
      formData.append('professorId', this.userData.id.toString());
    }
  
    if (this.selectedFile) {
      formData.append('fileName', this.selectedFile);
      console.log('Arquivo adicionado ao FormData:', this.selectedFile);
    }
  
    this.forumservice.createResposta(formData, this.forumId).subscribe(
      (response) => {
        this.showSucessMessage(`Resposta criada com sucesso!`);
        this.forumservice.getForum(this.forumId).subscribe((forum) => {
          this.forum = forum;
          this.respostas = forum.respostas!;
          this.respostas.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
        });
        this.respostaForm.reset();
      },
      (error) => {
        this.showErrorMessage('Erro ao criar resposta');
        console.error('Erro ao criar resposta:', error);
      }
    );
    this.selectedFile = undefined;
  }

  showSucessMessage(message: string) {
    alert(message);
  }

  showErrorMessage(message: string) {
    alert(message);
  }
  

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
  
      if (file.size > fileSizeLimit) {
        console.error('O arquivo é muito grande.');
        return;
      }
  
      if (!allowedTypes.includes(file.type)) {
        console.error('Tipo de arquivo não suportado.');
        return;
      }
  
      this.selectedFile = file;
      console.log('Arquivo selecionado:', this.selectedFile);
    }
  }
  

  get stateName() {
    return this.isOpen ? 'in' : 'out';
  }

  removeResposta(id: number) {
   if (!confirm('Deseja realmente remover essa resposta?')) {
      return;
    }

    this.forumservice.removeResposta(id).subscribe(
      (response) => {
        console.log('Resposta removida com sucesso:', response);

        this.forumservice.getForum(this.forumId).subscribe((forum) => {
          this.forum = forum;
          this.respostas = forum.respostas!;
          this.respostas.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
          console.log('Forum atualizado:', this.forum);
        } );
      },
      (error) => {
        console.error('Erro ao remover resposta:', error);
      }
    );
  }

  doarEstrela(aluno: Alunos) {
    const novaEstrelas = aluno.estrelas! + 1;
    const alunoAtualizado = { ...aluno, estrelas: novaEstrelas };
  
    this.forumservice.updateAluno(aluno.id, alunoAtualizado).subscribe(
      (response) => {
        console.log('Estrela doada com sucesso:', response);
  
        // Salvar no localStorage
        localStorage.setItem(`estrelaDoada_${this.forumId}_${this.userData.id}`, 'true');
        console.log(`Estrela doada salva no localStorage para o fórum ${this.forumId} e usuário ${this.userData.id}`);

        this.isStar = true; // Desabilitar o botão
  
        // Atualizar o fórum e as respostas
        this.forumservice.getForum(this.forumId).subscribe((forum) => {
          this.forum = forum;
          this.respostas = forum.respostas!;
          this.respostas.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
          console.log('Forum atualizado:', this.forum);
        });
      },
      (error) => {
        console.error('Erro ao doar estrela:', error);
      }
    );
  }
    

  isAuthor(): boolean {
    // Verifica se o usuário logado é o autor do fórum
    if (this.selectedForum.aluno?.id && this.userData.id ) {
      return this.selectedForum.aluno.id === this.userData.id;
    }
    if (this.selectedForum.professor?.id && this.userData.id &&  localStorage.getItem('userType') === 'professor') {
      return this.selectedForum.professor.id === this.userData.id;
    }
    
    return false;
  }

  closeResposta() {
    this.isOpen = false;
    this.close.emit();
  }
}