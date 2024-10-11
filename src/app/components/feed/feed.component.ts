import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Postagem } from '../../models/Postagem';
import { Comentarios } from '../../models/Comentarios';
import { FeedService } from '../../services/feed/feed.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alunos } from '../../models/Alunos';
import { UserDataServiceService } from '../../services/user-data-service.service';
import { environment } from '../../../environments/environment';
import { Professor } from '../../models/Professor';
import { CadastroAlunosService } from '../../services/cadastro/cadastro-alunos.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  @Input() userData!: Alunos | Professor; 

  apiUrl = environment.baseApiUrl;

  comments: boolean = false;
  currentPostId: number | null = null;

  postagens: Postagem[] = [];
  comentarios: Comentarios[] = [];

  postagemForm!: FormGroup;
  comentarioForm!: FormGroup;

  imgDefault!: string;

  constructor(
    private feedService: FeedService,
    private userDataService: UserDataServiceService,
  ) {}

  ngOnInit(): void {
    this.setImage();
    this.loadPostagem();
    this.feedService.getAllPostagens().subscribe((items) => {
      const data = items.data;
      this.postagens = data.map(postagem => {
        postagem.createdAt = new Date(postagem.createdAt!).toLocaleString('pt-BR');

        postagem.comentarios?.map(comentario => {
          comentario.createdAt = new Date(comentario.createdAt!).toLocaleString('pt-BR');
        });
    
        return postagem;
      });
    
      console.log('Postagens carregadas:', this.postagens);
    });
    

    this.userDataService.currentUserData.subscribe((userData) => {
      if (userData) {
        this.userData = userData!;
        console.log('userData', this.userData);
      }
    });

    this.postagemForm = new FormGroup({
      titulo: new FormControl('Default'),
      conteudo: new FormControl('', [Validators.required]),
      autor: new FormControl(this.userData.nome),
      img_autor: new FormControl(this.userData.img),
      imagem: new FormControl(''),
      comentarios: new FormControl(''),
      tags: new FormControl(''),
    });

    this.comentarioForm = new FormGroup({
      autor: new FormControl(this.userData.nome),
      img_autor: new FormControl(this.userData.img),
      conteudo: new FormControl('', [Validators.required]),
      qntd_estrelas: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && this.userData) {
      this.setImage();
    }
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

  async submitComentario() {
    if (this.comentarioForm.invalid) {
      alert('Formulário inválido!');
      return;
    }

    const comentarioData = this.comentarioForm.value;
    comentarioData.postagemId = Number(this.currentPostId!);

    await this.feedService.addComentario(comentarioData).subscribe(
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

  getImageUrl(imgAutor: string | undefined): string {
    return imgAutor ? `http://localhost:3333/uploads/${imgAutor}` : 'https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek=';
  }

  setImage() {
    if (this.userData?.img) {
      this.imgDefault = `${this.apiUrl}uploads/${this.userData.img}`;
    } else {
      this.imgDefault = 'https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek=';
    }
  }
  
}