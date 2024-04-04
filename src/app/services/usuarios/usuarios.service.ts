import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../core/models/usuario.model';
import { UsuarioInterface } from '../../core/interfaces/usuario.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  getUsuarios() {
    return this.httpClient.get(`${base_url}/user`, this.headers);
  }
  getUnUsuario(id: string) {
    return this.httpClient.get(`${base_url}/user/${id}`, this.headers);
  }
  crearUsuarios(usuario: UsuarioInterface) {
    return this.httpClient.post(`${base_url}/user`, usuario, this.headers);
  }
  // TODO: completar la definicion de mi servicio
  actualizarUsuario(usuario: UsuarioModel) {
    return this.httpClient.put(
      `${base_url}/user/${usuario._id}`,
      usuario,
      this.headers
    );
  }
  eliminarUsuarios(id: string) {
    return this.httpClient.delete(`${base_url}/user/${id}`, this.headers);
  }
}
