import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent implements OnInit {
  
  @Input() showFilter!: boolean;

  @Output() closeFiltro = new EventEmitter<void>();

  ngOnInit(): void {}

  constructor() {}

  closeFilter() {
    this.closeFiltro.emit();
  }

}
