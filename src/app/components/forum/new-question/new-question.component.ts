import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../../../services/forum/forum.service';
import { Alunos } from '../../../models/Alunos';
import { Professor } from '../../../models/Professor';
import { environment } from '../../../../environments/environment';
import { UserDataServiceService } from '../../../services/user-data-service.service';
import { Forum } from '../../../models/Forum';
import { Materias } from '../../../models/Materias';
import { MateriaService } from '../../../services/materia/materia.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css'
})
export class NewQuestionComponent implements OnInit {
  
  @Input() userData!: Alunos | Professor;
  @Input() showForm!: boolean;
  @Input() forums!: Forum[];
  @Output() closeForm = new EventEmitter<void>();

  apiUrl = environment.baseApiUrl;
  materias: Materias[] = [];
  
  forumForm!: FormGroup;
  
  constructor(
    private forumService: ForumService,
    private userDataService: UserDataServiceService,
    private materiaService: MateriaService,
  ) {}

  ngOnInit() {
    this.userDataService.currentUserData.subscribe((userData) => {
      if (userData) {
        this.userData = userData!;
        console.log('userData', this.userData);
      }
    });

    this.materiaService.getAllMaterias().subscribe((items) => {
      const data = items;
      this.materias = data.map(materia => {
        return materia;
        
      }); 
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
        this.loadForum();
      });
    }
  }

  loadForum() {
    location.reload();
  }

  closeQuestionForm() {
    this.closeForm.emit();
  }

}
