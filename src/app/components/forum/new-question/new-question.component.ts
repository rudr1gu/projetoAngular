import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css'
})
export class NewQuestionComponent implements OnInit {
  @Input() showForm!: boolean;
  
  @Output() closeForm = new EventEmitter<void>();

  ngOnInit(): void {}

  constructor() {}

  closeQuestionForm() {
    this.closeForm.emit();
  }

}
