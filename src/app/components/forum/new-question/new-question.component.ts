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
import { Tag } from '../../../models/Tag';

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

  selectedTags: Tag[] = [];
  selectedTagList: Tag[] = [];  // Tags escolhidas pelo usuário
  
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
        console.log('Materia:', materia);
        return materia;
        
      }); 
    });

    this.forumForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      materiaId: new FormControl('1', Validators.required),
      alunoId: new FormControl(this.userData.id),
      tags: new FormControl([]),
    });


  }

  submitForum() {
    if (this.forumForm.valid) {
      this.forumService.createForum({
        ...this.forumForm.value,
        tags: this.selectedTagList.map(tag => tag.nome)
      }).subscribe((data) => {
        console.log('Forum criado com sucesso', data);
        this.forumForm.reset();
        this.selectedTagList = [];
        this.closeQuestionForm();
        this.loadForum();
      });
    }
  }

  onMateriaChange() {
    const materiaId = this.forumForm.get('materiaId')?.value;
    const materiaSelecionada = this.materias.find(materia => materia.id === Number(materiaId));
    
    if (materiaSelecionada) {
        this.selectedTags = materiaSelecionada.tags; // Atualiza as tags
        console.log('Tags selecionadas:', this.selectedTags); // Log para verificação
        this.forumForm.get('tags')?.setValue([]); // Reseta as tags selecionadas
    }
}

  loadForum() {
    location.reload();
  }

  closeQuestionForm() {
    this.closeForm.emit();
  }

  toggleTagSelection(tag: Tag) {
    const index = this.selectedTagList.findIndex(t => t.nome === tag.nome);
    if (index >= 0) {
      this.selectedTagList.splice(index, 1);
    } else {
      this.selectedTagList.push(tag);
    }
    this.forumForm.get('tags')?.setValue(this.selectedTagList);
  }

  isTagSelected(tag: Tag): boolean {
    return this.selectedTagList.some(t => t.nome === tag.nome);
  }

}
