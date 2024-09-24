import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Materias } from '../../../models/Materias';
import { Tag } from '../../../models/Tag';
import { MateriaService } from '../../../services/materia/materia.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent implements OnInit {
  
  @Input() showFilter!: boolean;
  @Output() closeFiltro = new EventEmitter<void>();
  @Output() filterChange = new EventEmitter<{ materiaId: number | null, tag: string | null }>();

  selectedMateriaId: number | null = null;
  selectedTag: string | null = null;

  materias: Materias[] = [];
  tags: Tag[] = [];

  constructor(private materiaService: MateriaService) {}

  ngOnInit(): void {
    this.materiaService.getAllMaterias().subscribe((materias) => {
      this.materias = materias;
      console.log(this.materias);
      this.tags = this.getAllTags(materias);
      console.log(this.tags);
    });
  }

  getAllTags(materias: Materias[]): Tag[] {
    const allTags: Tag[] = [];
    materias.forEach(materia => {
      materia.tags.forEach(tag => {
        if (!allTags.find(t => t.id === tag.id)) {
          allTags.push(tag);
        }
      });
    });
    return allTags;
  }

  applyFilter() {
    this.filterChange.emit({ materiaId: this.selectedMateriaId, tag: this.selectedTag });
  }
  

  closeFilter() {
    this.closeFiltro.emit();
  }
}