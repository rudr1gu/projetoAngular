// importando o Component, OnInit e Input e Output para criar um componente
import { Component, OnInit, Input, Output } from '@angular/core';
// importando o model Postagem para tipar o array de postagens
import { Postagem } from '../../models/Postagem';
import { Comentarios } from '../../models/Comentarios';
import { FeedService } from '../../services/feed/feed.service';

import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Alunos } from '../../models/Alunos';
import { UserDataServiceService } from '../../services/user-data-service.service';

// import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})

export class FeedComponent implements OnInit{


  @Input() userData!: Alunos;


  imgDefault = 'https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek='
  comments: boolean = false;

  currentPostId: number | null = null;

  postagens: Postagem[] = [];
  comentarios: Comentarios[] = [];

  postagemForm!: FormGroup;
  comentarioForm!: FormGroup;
 
  constructor(
    private feedService: FeedService,
    private userDataService: UserDataServiceService
  ) {}

  ngOnInit(): void {
    this.feedService.getAllPostagens().subscribe((items) => {
      const data = items.data;

      data.map((postagem) => {
        postagem.createdAt = new Date(postagem.createdAt!).toLocaleString('pt-BR');

        postagem.comentarios?.map((comentario) => {
          comentario.createdAt = new Date(comentario.createdAt!).toLocaleString('pt-BR');
        });
       
      });

      this.postagens = data;

    });

    this.userDataService.currentUserData.subscribe((userData) => {
      if (userData) {
        this.userData = userData!;
        console.log('userData', this.userData); 
      }
    });

    this.postagemForm = new FormGroup({
      titulo: new FormControl('Default'),
      conteudo: new FormControl('',[Validators.required]),
      autor: new FormControl(this.userData.nome),
      imagem: new FormControl(''),
      comentarios: new FormControl(''),
      tags: new FormControl(''),
    });

    this.comentarioForm = new FormGroup({
      autor: new FormControl(this.userData.nome),
      conteudo: new FormControl('',[Validators.required]),
      qntd_estrelas: new FormControl(''),
    });

  
  }

  loadPostagem() {
    this.feedService.getAllPostagens().subscribe(
      (response) => {
        this.postagens = response.data;

        this.postagens.map((postagem) => {
          postagem.createdAt = new Date(postagem.createdAt!).toLocaleString('pt-BR');
        });
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

  get autor() {
    return this.comentarioForm.get('autor');
  }

  async submitComentario() {
    if (this.comentarioForm.invalid) {
      alert('Formulário inválido!');
      return;
    }

    const comentarioData = this.comentarioForm.value;
    comentarioData.postagemId = Number(this.currentPostId!);

    await this.feedService.addComentario( comentarioData).subscribe(
      (response) => {
        console.log('Comentário criado com sucesso:', response);
        this.comentarioForm.reset();
        this.loadPostagem();
      },
      (error) => {
        console.error('Erro ao criar o comentário:', error);
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

  showComments(postagemId: number): void {
    this.currentPostId = this.currentPostId === postagemId ? null : postagemId;
  }
  
}