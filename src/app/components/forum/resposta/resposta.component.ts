import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


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

  constructor() { }

  ngOnInit(): void {}

  get stateName() {
    return this.isOpen ? 'in' : 'out'; // Define o estado da animação
  }

  closeResposta() {
    this.close.emit();
  }
}