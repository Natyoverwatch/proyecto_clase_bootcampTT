import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cliente } from '../../../core/interfaces/cliente';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { ClienteModel } from '../../../core/models/cliente.model';

@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css',
})
export class AgregarClientesComponent {
  misClientes: Cliente[] = [];

  datoFormClient = new FormGroup({
    id: new FormControl(this.misClientes.length + 1),
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl(0, [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    estado: new FormControl(false, [Validators.required]),
  });

  @Output() enviarData: EventEmitter<Cliente> = new EventEmitter<Cliente>();

  constructor(private clienteService: ClientesService) {}

  newDatoCliente() {
    const data = this.datoFormClient.value;
    const nuevoCliente: Cliente = {
      _id: data.id || this.misClientes.length + 1,
      nombre: data.nombre || '',
      direccion: data.direccion || '',
      telefono: data.telefono || 0,
      email: data.email || '',
      tipoDocumento: data.tipoDocumento || '',
      numeroDocumento: data.numeroDocumento || '',
      estado: data.estado || false,
    };
    this.enviarData.emit(nuevoCliente);
  }

  crearCliente() {
    const clienteNuevo = this.datoFormClient.value;
    if (this.datoFormClient.valid) {
      const data: ClienteModel = {
        nombre: clienteNuevo.nombre || '',
        telefono: Number(clienteNuevo.telefono),
        email: clienteNuevo.email || '',
        tipoDocumento: clienteNuevo.tipoDocumento || '',
        numeroDocumento: clienteNuevo.numeroDocumento || '',
        direccion: clienteNuevo.direccion || '',
      };

      this.clienteService.crearClientes(data).subscribe({
        next: (resp: any) => {
          console.log('Usuario Creado', resp);
          this.datoFormClient.reset();
        },
        error: (error: any) => {
          console.log('Error al crear el cliente', error);
        },
      });
    }
  }
}
