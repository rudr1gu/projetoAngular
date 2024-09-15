import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../../../services/forum/forum.service';
import { Alunos } from '../../../models/Alunos';
import { Professor } from '../../../models/Professor';
import { environment } from '../../../../environments/environment';
import { UserDataServiceService } from '../../../services/user-data-service.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css'
})
export class NewQuestionComponent implements OnInit {
  
  @Input() userData!: Alunos | Professor;
  @Input() showForm!: boolean;
  @Output() closeForm = new EventEmitter<void>();

  apiUrl = environment.baseApiUrl;
  
  forumForm!: FormGroup;
  
  constructor(
    private forumService: ForumService,
    private userDataService: UserDataServiceService
  ) {}

  ngOnInit() {
    this.userDataService.currentUserData.subscribe((userData) => {
      if (userData) {
        this.userData = userData!;
        console.log('userData', this.userData);
      }
    });

    this.forumForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      materiaId: new FormControl('', Validators.required),
      alunoId: new FormControl(this.userData.id),
    });
  }

  submitForum() {
    if (this.forumForm.valid) {
      this.forumService.createForum(this.forumForm.value).subscribe((data) => {
        console.log('Forum criado com sucesso', data);
        this.forumForm.reset();
        this.closeQuestionForm();
      });
    }
  }

  closeQuestionForm() {
    this.closeForm.emit();
  }

}
