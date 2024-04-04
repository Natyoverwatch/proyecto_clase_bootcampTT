import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioModel } from '../../core/models/usuario.model';
import { UsuarioInterface } from '../../core/interfaces/usuario.interface';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-usuarios.component.html',
  styleUrl: './agregar-usuarios.component.css',
})
export class AgregarUsuariosComponent implements OnInit {
  misUsuarios: UsuarioInterface[] = [];
  usuarioSeleccionado: UsuarioModel;

  datoFormUser = new FormGroup({
    //id: new FormControl(this.misUsuarios.length + 1),
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl(0, [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
    estado: new FormControl(false, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      this.buscarUsuario(id);
    });
  }

  agregarUser() {
    if (this.usuarioSeleccionado) {
      this.actualizarUsuario();
    } else {
      const userNuevo = this.datoFormUser.value;
      if (this.datoFormUser.valid) {
        const data: UsuarioInterface = {
          nombre: userNuevo.nombre || '',
          email: userNuevo.email || '',
          tipoDocumento: userNuevo.tipoDocumento || '',
          numeroDocumento: userNuevo.numeroDocumento || 0,
          login: userNuevo.login || '',
          password: userNuevo.password || '',
          rol: userNuevo.rol || '',
          estado: userNuevo.estado || true,
        };

        this.usuarioService.crearUsuarios(data).subscribe({
          next: (resp: any) => {
            console.log('Usuario Creado', resp);
            this.datoFormUser.reset();
            Swal.fire(
              'Usuario Creado',
              'El usuario se creo correctamente',
              'success'
            );
          },
          error: (error: any) => {
            console.log('Error al crear el usuario', error);
            Swal.fire('Usuario No creado', 'El usuario no se creo', 'error');
          },
        });
      }
    }
  }

  actualizarUsuario() {
    const dataActualizada: UsuarioModel = {
      // ...this.datoFormUser.value,
      _id: this.usuarioSeleccionado._id,
      nombre: this.datoFormUser.value.nombre || '',
      email: this.datoFormUser.value.email || '',
      tipoDocumento: this.datoFormUser.value.tipoDocumento || '',
      numeroDocumento: this.datoFormUser.value.numeroDocumento || 0,
      login: this.datoFormUser.value.login || '',
      rol: this.datoFormUser.value.rol || '',
    };
    console.log(dataActualizada);
    this.usuarioService.actualizarUsuario(dataActualizada).subscribe({
      next: (resp: any) => {
        Swal.fire(
          'Usuario Actualizado',
          `El usuario se actualizó satisfactoriamente`,
          'success'
        );
      },
      error: (error: any) => {
        const errors = error?.error?.errors;
        const errorList: string[] = [];

        if (errors) {
          Object.entries(errors).forEach(([key, value]: [string, any]) => {
            if (value && value['msg']) {
              errorList.push('* ' + value['msg'] + '<br>');
            }
          });
        }

        Swal.fire({
          title: 'Error al actualizar el usuario',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }

  buscarUsuario(id: string) {
    if (id !== 'nuevo') {
      this.usuarioService.getUnUsuario(id).subscribe({
        next: (resp: any) => {
          const {
            nombre,
            email,
            tipoDocumento,
            numeroDocumento,
            login,
            password,
            rol,
            estado,
          } = resp.usuario;
          this.usuarioSeleccionado = resp.usuario;

          this.datoFormUser.setValue({
            nombre: nombre,
            email: email,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            login: login,
            password: '',
            rol: rol,
            estado: estado,
          });
        },
        error: (error: any) => {
          const errors = error?.error?.errors;
          const errorList: string[] = [];

          if (errors) {
            Object.entries(errors).forEach(([key, value]: [string, any]) => {
              if (value && value['msg']) {
                errorList.push('* ' + value['msg'] + '<br>');
              }
            });
          }

          Swal.fire({
            title: 'Error al buscar el usuario',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });
    }
  }
}
