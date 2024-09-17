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

      console.log('Forums carregados:', this.forums);
    });

  }

  showForm() {
    this.newQuestion = !this.newQuestion;
  }

  showFilter() {
    this.showFiltro = !this.showFiltro;
  }

  showAnswers() {
    this.showRespostas = !this.showRespostas; // Alterna ou fecha as respostas
  }
  

}
