import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactoForm = new FormGroup({ 
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    ciudad: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    mensajes: new FormControl('Mensaje por defecto'),

   });
  enviarContacto(){
    console.log('Enviar', this.contactoForm.value);
  }
}
