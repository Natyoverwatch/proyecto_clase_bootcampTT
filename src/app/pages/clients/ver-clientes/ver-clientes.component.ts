import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from '../../../core/interfaces/cliente';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AgregarClientesComponent } from '../agregar-clientes/agregar-clientes.component';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { Router } from '@angular/router';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { PermisosDirective } from '../../../core/directives/permisos/permisos.directive';

@Component({
  selector: 'app-ver-clientes',
  standalone: true,
  templateUrl: './ver-clientes.component.html',
  styleUrl: './ver-clientes.component.css',
  imports: [AgregarClientesComponent, PermisosDirective],
})
export class VerClientesComponent implements OnInit {
  misClientes: Cliente[] = [];

  constructor(
    private clienteService: ClientesService,
    private router: Router
  ) {}

  showServiceMenu = false;
  toggleServiceMenu() {
    this.showServiceMenu = !this.showServiceMenu;
  }

  ngOnInit(): void {
    /* this.misClientes.push(
      {
      id:1,
      nombre: "Jose",
      direccion: "Cra 7 No 45-64",
      telefono: 321452435,
      email: "aksjd@añsdhf.com",
      tipoDocumento: "cc",
      numeroDocumento: "13657683234",
      estado: true,
    },
    {
      id:2,
      nombre: "Martin",
      direccion: "cll 75 No 45-64",
      telefono: 42534252,
      email: "qwerqwrd@añsdhf.com",
      tipoDocumento: "cc",
      numeroDocumento: "26545623",
      estado: true,
    },
    {
      id:3,
      nombre: "Rodrigo",
      direccion: "Cra 56 No 84d-64",
      telefono: 84562223,
      email: "fgsdf@sdfg.com",
      tipoDocumento: "cc",
      numeroDocumento: "2547902345",
      estado: false,
    }
    
    
    )

    //Iteracion de clientes
  this.misClientes.forEach((cliente) => {
    console.log("Mis Clientes: ",cliente)
  }); */
    this.clienteService.getClientes().subscribe((data: any) => {
      console.log('Mis Clientes: ', data);
      this.misClientes = data.clientes;
    });
  }

  agregarClientes() {
    this.router.navigateByUrl(ROUTER_APP.ADD_CLIENTES);
  }

  eliminarCliente(idCliente: number): void {
    this.misClientes = this.misClientes.filter(
      (cliente) => cliente._id !== idCliente
    );
    this.misClientes.slice(idCliente, 1);
    console.log('Mis Clientes Eliminado: ', this.misClientes);
  }

  recibirData(nuevoCliente: Cliente) {
    this.misClientes.push(nuevoCliente);
  }
}
