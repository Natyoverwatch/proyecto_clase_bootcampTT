import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuarioModel } from '../../core/models/usuario.model';
import Swal from 'sweetalert2';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { config } from '../../../environments/config/config';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ROUTER_APP } from '../../core/enum/router-app.enum';

@Component({
  selector: 'app-ver-usuarios',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css',
})
export class VerUsuariosComponent implements OnInit, OnDestroy {
  usuarioSubscription: Subscription;
  usuarios: UsuarioModel[] = [];
  usuarioLogin: UsuarioModel;
  roles = Object.values(config.roles);

  constructor(
    private usuarioService: UsuariosService,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioLogin = this.autenticacionService.usuario;
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {
    // cuando el componente se cierre en ese momento se elimina la suscripcion de un servicio
    this.usuarioSubscription?.unsubscribe();
  }

  cargarUsuarios() {
    this.usuarioSubscription = this.usuarioService
      .getUsuarios()
      .subscribe((resp: any) => {
        this.usuarios = resp.usuarios;
      });
  }
  agregarUsuarios() {
    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_USUARIOS}/nuevo`);
  }
  editarUsuarios(id: string) {
    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_USUARIOS}/${id}`);
  }
  eliminarUsuario(id: string) {
    if (id === this.usuarioLogin._id) {
      Swal.fire('Error!', 'No puede eliminar este usuario', 'error');
    } else {
      this.usuarioService.eliminarUsuarios(id).subscribe((resp: any) => {
        this.cargarUsuarios();
        Swal.fire(
          'Eliminado',
          `se eliminó el usuario ${resp.usuario.nombre}`,
          'success'
        );
      });
    }
  }
  actualizarRol(usuario: UsuarioModel) {
    this.usuarioService.actualizarUsuario(usuario).subscribe((resp: any) => {
      Swal.fire(
        'Actualizado',
        `se actualizó el usuario ${resp.usuario.nombre}`,
        'success'
      );
    });
  }
}
