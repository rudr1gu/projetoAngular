# Conectados - Rede de Apoio
Visite: [Conectados](https://rede-conectados.vercel.app)

Desenvolvido com:

![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/-NodeJS-339933?style=flat-square&logo=node.js&logoColor=white)



Requisitos:

![Nodejs](https://img.shields.io/badge/-v20.14.0-339933?style=flat-square&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/-v10.7.0-CB3837?style=flat-square&logo=npm&logoColor=white)

<details>
<summary>Run Project</summary>

```bach
git clone https://github.com/rudr1gu/projetoAngular.git
```

```bach
npm install -g @angular/cli@14
```

```bach
npm install
```

```bach
ng serve
```
open to browser on: `http://localhost:4200/`.
</details>

<details>
<summary>Conectados - Rede de Apoio</summary>

Nossa aplicação web tem como objetivo construir uma comunidade escolar colaborativa e inclusiva, onde alunos e professores possam interagir de maneira significativa. O fórum da comunidade é um espaço essencial onde os alunos podem compartilhar dúvidas relacionadas aos seus cursos, enquanto outros alunos podem responder, promovendo uma troca de conhecimento que fortalece o aprendizado coletivo. Esse tipo de interação é crucial para o desenvolvimento de uma educação mais conectada e participativa. Kenski (2013) destaca que as tecnologias desempenham um papel vital na facilitação da comunicação e colaboração entre os estudantes, criando ambientes de aprendizagem mais dinâmicos.

Para incentivar a participação ativa dos alunos, adotamos a gamificação, uma estratégia que premia aqueles que colaboram no aprendizado de seus colegas. Essa abordagem é respaldada por estudos que demonstram que a gamificação pode aumentar significativamente a motivação e o engajamento dos alunos (Rodrigues, 2017). As contribuições dos alunos são avaliadas pelos professores e podem se refletir em notas no curso, reconhecendo o esforço dos estudantes que se destacam ao ajudar os outros. Essa prática é alinhada com a teoria da aprendizagem colaborativa, que sugere que a colaboração entre pares melhora não apenas a compreensão do conteúdo, mas também a retenção de conhecimento.

Você sabia que o momento em que mais aprendemos é quando ensinamos? Segundo a pirâmide de aprendizagem de William Glasser, a aprendizagem é mais eficaz quando envolve atividades práticas e o ensino para outras pessoas (Glasser, 2008). A participação ativa dos alunos no processo de ensino e a promoção de um ambiente de ensino recíproco podem ser extremamente eficazes. Estudos demonstram que os alunos aprendem mais quando estão envolvidos em ensinar (Bell & Trindade, 2019), reforçando a ideia de que o ensino colaborativo é um método potente de aprendizagem.

Como afirmado por Glasser (2017), “a boa educação é aquela em que o professor pede para que seus alunos pensem e se dediquem a promover um diálogo para promover a compreensão e o crescimento dos estudantes. ” Essa visão orienta nossa proposta, destacando a importância do diálogo e da reflexão na construção do conhecimento.
</details>


<details>
<summary>Estrutura de Pastas</summary>

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── arquivos/
│   │   │   ├── arquivos.component.css
│   │   │   ├── arquivos.component.html
│   │   │   ├── arquivos.component.spec.ts
│   │   │   ├── arquivos.component.ts
│   │   ├── aside/
│   │   │   ├── aside.component.css
│   │   │   ├── aside.component.html
│   │   │   ├── aside.component.spec.ts
│   │   │   ├── aside.component.ts
│   │   ├── cadastro-aluno/
│   │   │   ├── cadastro-aluno.component.css
│   │   │   ├── cadastro-aluno.component.html
│   │   │   ├── cadastro-aluno.component.spec.ts
│   │   │   ├── cadastro-aluno.component.ts
│   │   ├── calendario/
│   │   │   ├── calendario.component.css
│   │   │   ├── calendario.component.html
│   │   │   ├── calendario.component.spec.ts
│   │   │   ├── calendario.component.ts
│   │   ├── curso/
│   │   │   ├── curso.component.css
│   │   │   ├── curso.component.html
│   │   │   ├── curso.component.spec.ts
│   │   │   ├── curso.component.ts
│   │   ├── feed/
│   │   │   ├── feed.component.css
│   │   │   ├── feed.component.html
│   │   │   ├── feed.component.spec.ts
│   │   │   ├── feed.component.ts
│   │   ├── forum/
│   │   │   ├── filtro/
│   │   │   |    ├── filtro.component.css
│   │   │   |    ├── filtro.component.html
│   │   │   |    ├── filtro.component.spec.ts
│   │   │   |    ├── filtro.component.ts
│   │   │   ├── new-question/
│   │   │   |    ├── new-question.component.css
│   │   │   |    ├── new-question.component.html
│   │   │   |    ├── new-question.component.spec.ts
│   │   │   |    ├── new-question.component.ts
│   │   │   ├── resposta/
│   │   │   |    ├── resposta.component.css
│   │   │   |    ├── resposta.component.html
│   │   │   |    ├── resposta.component.spec.ts
│   │   │   |    ├── resposta.component.ts
│   │   │   ├── forum.component.css
│   │   │   ├── forum.component.html
│   │   │   ├── forum.component.spec.ts
│   │   │   ├── forum.component.ts
│   │   ├── home/
│   │   │   ├── home.component.css
│   │   │   ├── home.component.html
│   │   │   ├── home.component.spec.ts
│   │   │   ├── home.component.ts
│   │   ├── login-aluno/
│   │   │   ├── login-aluno.component.css
│   │   │   ├── login-aluno.component.html
│   │   │   ├── login-aluno.component.spec.ts
│   │   │   ├── login-aluno.component.ts
│   │   ├── ranking/
│   │   │   ├── ranking.component.css
│   │   │   ├── ranking.component.html
│   │   │   ├── ranking.component.spec.ts
│   │   │   ├── ranking.component.ts
│   ├── models/
|   |   ├── Aluno.ts
|   |   ├── Comentarios.ts
|   |   ├── Forum.ts
|   |   ├── LoginResponse.ts
|   |   ├── Materias.ts
|   |   ├── Postagem.ts
|   |   ├── Professor.ts
|   |   ├── Response.ts
|   |   ├── Resposta.ts
|   |   ├── Tag.ts
│   ├── services/
|   |   ├── arquivos/
│   │   │   ├── arquivos.service.spec.ts
│   │   │   ├── arquivos.service.ts
|   |   ├── aside/
│   │   │   ├── aside.service.spec.ts
│   │   │   ├── aside.service.ts
|   |   ├── cadastro/
│   │   │   ├── cadastro.service.spec.ts
│   │   │   ├── cadastro.service.ts
|   |   ├── calendario/
│   │   │   ├── calendario.service.spec.ts
│   │   │   ├── calendario.service.ts
|   |   ├── curso/
│   │   │   ├── curso.service.spec.ts
│   │   │   ├── curso.service.ts
|   |   ├── feed/
│   │   │   ├── feed.service.spec.ts
│   │   │   ├── feed.service.ts
|   |   ├── forum/
│   │   │   ├── forum.service.spec.ts
│   │   │   ├── forum.service.ts
|   |   ├── home/
│   │   │   ├── home.service.spec.ts
│   │   │   ├── home.service.ts
|   |   ├── login/
│   │   │   ├── login.service.spec.ts
│   │   │   ├── login.service.ts
|   |   ├── materia/
│   │   │   ├── materia.service.spec.ts
│   │   │   ├── materia.service.ts
|   |   ├── ranking/
│   │   │   ├── ranking.service.spec.ts
│   │   │   ├── ranking.service.ts
│   │   ├── user-data.service.spec.ts
│   │   ├── user-data.service.ts
│   ├── app-routing.module.ts
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── app.module.server.ts
│   ├── auth.guard.ts
│   ├── public.guard.ts
├── environments/
│   ├── environment.development.ts
│   ├── environment.ts
├── index.html
├── main.server.ts
├── main.ts
├── styles.css
.editorconfig
.gitignore
angular.json
ngsw-config.json
package-lock.json
package.json
README.md
server.ts
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```
</details>

### Colaboradores:

- [Djair Santos](https://github.com/djair2113)
- [Eduarda Serapili](https://github.com/EduardaSerapili)
- [ Marcus Vannucchi](https://github.com/vannucchi10)
- [Otavio Fernandes](https://github.com/t4vzz)
- [Rodrigo Santos](https://www.github.com/rudr1gu)
- [Tarcisio Neves](https://github.com/Cizok)