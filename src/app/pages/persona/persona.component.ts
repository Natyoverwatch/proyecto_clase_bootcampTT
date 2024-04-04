import { Component } from '@angular/core';
import { TablaComponent } from "../../components/tabla/tabla.component";
import { ContadorComponent } from "../../components/contador/contador.component";

@Component({
    selector: 'app-persona',
    standalone: true,
    templateUrl: './persona.component.html',
    styleUrl: './persona.component.css',
    imports: [TablaComponent, ContadorComponent]
})
export class PersonaComponent {

  titulo: string = 'Componente persona';
  edad: number = 25;
  tituloTabla: string = 'Este es el componenete padre';
  ocultar: boolean = true;
  contador: number = 0;

  users: { id: number; name: string }[] = [
    { id: 0, name: 'Diana' },
    { id: 1, name: 'Carolina' },
    { id: 2, name: 'Ariadna' },
    { id: 3, name: 'Jessica' },
    { id: 4, name: 'Lolita' },
    { id: 5, name: 'Pepito' },
    { id: 6, name: 'Pablito' },
    { id: 7, name: 'Maria' },
  ];
  recibirContador(numero:number){
    this.contador = numero;
  }
}
