import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Resposta } from '../../../models/Resposta';
import { ForumService } from '../../../services/forum/forum.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataServiceService } from '../../../services/user-data-service.service';
import { Alunos } from '../../../models/Alunos';
import { Professor } from '../../../models/Professor';
import { Forum } from '../../../models/Forum';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrls: ['./resposta.component.css'],
  animations: [
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
  ]
})
export class RespostaComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter();
  @Input() userData!: Alunos | Professor;
  @Input() forum?: Forum;
  @Input() forumId!: number;
  @Input() respostas!: Resposta[];

  apiUrl = environment.baseApiUrl;

  respostaForm!: FormGroup;

  imgDefault = 'https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek=';


  constructor(
    private forumservice: ForumService,
    private userDataService: UserDataServiceService
  ) { }

  ngOnInit(): void {
    // atualizar a lista de respostas
    this.respostas.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());

    this.userDataService.currentUserData.subscribe((userData) => {
      if (userData) {
        this.userData = userData!;
        console.log('userData', this.userData);
      }
    });

    this.respostaForm = new FormGroup({
      resposta: new FormControl('', Validators.required),
    });
  }

  adicionarResposta() {
    const data: Resposta = {
      resposta: this.respostaForm.get('resposta')!.value,
      usuarioId: this.userData.id,
      forumId: this.forumId,
    };

    this.forumservice.createResposta(data).subscribe(
      (response) => {
        console.log('Resposta criada com sucesso:', response);
        
        this.forumservice.getForum(this.forumId).subscribe((forum) => {
          this.forum = forum;
          this.respostas = forum.respostas!;
          this.respostas.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
          console.log('Forum atualizado:', this.forum);
        } );
      
        this.respostaForm.reset();    
      },
      (error) => {
        console.error('Erro ao criar resposta:', error);
      }
    );
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

  closeResposta() {
    this.isOpen = false;
    this.close.emit();
  }
}