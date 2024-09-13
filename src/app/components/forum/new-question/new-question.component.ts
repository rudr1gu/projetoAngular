import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Forum } from '../../../models/Forum';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css'
})



export class NewQuestionComponent implements OnInit{
  
  forumForm!: FormGroup;
  forum: Forum[] = [];

  constructor(){}

  ngOnInit(): void {

    this.forumForm = new FormGroup(
      {
        titulo: new FormControl(''),
        descricao: new FormControl(''),
        aluno_id: new FormControl(''),
      }
    )
  }


}
