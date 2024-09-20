import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Resposta } from '../../../models/Resposta';
import { ForumService } from '../../../services/forum/forum.service';
import { Form, FormGroup } from '@angular/forms';
import { UserDataServiceService } from '../../../services/user-data-service.service';
import { Alunos } from '../../../models/Alunos';
import { Professor } from '../../../models/Professor';


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

  respostaForm!: FormGroup;

  resposta: Resposta[] = [];

  constructor(
    private forumservice: ForumService,
    private userDataService: UserDataServiceService
  ) { }

  ngOnInit(): void {
    this.userDataService.currentUserData.subscribe((userData) => {
      if (userData) {
        this.userData = userData!;
        console.log('userData', this.userData);
      }
    });
  }

  get stateName() {
    return this.isOpen ? 'in' : 'out';
  }

  closeResposta() {
    this.close.emit();
  }
}