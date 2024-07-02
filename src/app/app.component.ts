import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userData = {
    name: 'José Pedro',
    age: 20,
    email: 'zepedro@etec.sp.gov.br',
    curso: 'Tec. Desenvolvimento de Sistemas',
    ra: 123,
    rg: 123456789,
    modulo: 'Segundo Semestres',
    periodo: 'Noturno'
  };
  title = 'rede-de-apoio';
}
