// importando o Component, OnInit e Input e Output para criar um componente
import { Component, OnInit, Input, Output } from '@angular/core';
// importando o model Postagem para tipar o array de postagens
import { Postagem } from '../../models/Postagem';
import { RespostaPost } from '../../models/RespostaPost';
import { FeedService } from '../../services/feed/feed.service';

import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})

export class FeedComponent implements OnInit{

  @Output() onSubmit = new EventEmitter<Postagem>();

  // @Input() userData!: {
  //   name: string,
  //   age: number,
  //   email: string,
  //   curso: string,
  //   ra: number,
  //   rg: number,
  //   modulo: string,
  //   periodo: string
  // }

  currentPostId: number | null = null;

  postagens: Postagem[] = [];
  resPost: RespostaPost[] = [];

  postagemForm!: FormGroup;
 
  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getAllPostagens().subscribe(items => {
      const postagens = items.map(item => {
        return {
          id: item.id,
          titulo: item.titulo,
          conteudo: item.conteudo,
          autor: item.autor,
          imagem: item.imagem,
          tags: item.tags,
          qntd_estrelas: item.qntd_estrelas,
          createdAt: item.createdAt = new Date(item.createdAt!).toLocaleDateString('pt-BR'),
          updatedAt: item.updatedAt
        };
      });

      this.postagens = postagens;

    });

    this.postagemForm = new FormGroup({
      titulo: new FormControl('Default'),
      conteudo: new FormControl('',[Validators.required]),
      autor: new FormControl('Default'),
      imagem: new FormControl(''),
      tags: new FormControl(''),
    });
  }

  loadPostagem() {
    this.feedService.getAllPostagens().subscribe(
      (data) => {
        this.postagens = data;
      },
      (error) => {
        console.error('Erro ao carregar as postagens:', error);
      }
    );
  }

  get titulo() {
    return this.postagemForm.get('titulo');
  }

  get conteudo() {
    return this.postagemForm.get('conteudo');
  }

  submit() {
    if (this.postagemForm.invalid) {
      alert('Formulário inválido!');
      return;
    }
  
    this.feedService.novaPostagem(this.postagemForm.value).subscribe(
      (response) => {
        console.log('Postagem criada com sucesso:', response);
        this.postagemForm.reset();
        this.loadPostagem();
      },
      (error) => {
        console.error('Erro ao criar a postagem:', error);
      }
    );
  }


  removePostagem(id: number) {
    this.feedService.remover(id).subscribe(
      () => {
        alert('Postagem removida com sucesso!');   
        this.loadPostagem();
      },
      (error) => {
        alert('Erro ao remover a postagem:');
        console.error(error);
      }
    );
  }
  
}