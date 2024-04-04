import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ContactComponent } from './pages/contact/contact.component';
import { VerClientesComponent } from './pages/clients/ver-clientes/ver-clientes.component';
import { AgregarClientesComponent } from './pages/clients/agregar-clientes/agregar-clientes.component';
import { AutenticacionComponent } from './auth/autenticacion/autenticacion.component';
import { authGuard } from './guards/auth/auth.guard';
import { AgregarUsuariosComponent } from './usuarios/agregar-usuarios/agregar-usuarios.component';
import { VerUsuariosComponent } from './usuarios/ver-usuarios/ver-usuarios.component';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'Autenticacion',
    children: [{ path: 'login', component: AutenticacionComponent }],
  },
  {
    path: 'inicio',
    title: 'Inicio',
    canActivate: [authGuard],
    children: [
      //Path por defecto de Path padre
      { path: '', title: 'home', component: HomeComponent },
      {
        path: 'services',
        title: 'Servicios',
        component: ServicesComponent,
      },
      {
        path: 'aboutMe',
        title: '¿Quienes somos?',
        component: AboutMeComponent,
      },
      {
        path: 'contact',
        title: 'Contactanos',
        component: ContactComponent,
      },
      {
        path: 'clients',
        title: 'Mis clientes',
        component: VerClientesComponent,
      },
      {
        path: 'add-clientes',
        title: 'Agregar clientes',
        component: AgregarClientesComponent,
      },
      {
        path: 'add-clientes',
        title: 'Agregar clientes',
        component: AgregarClientesComponent,
      },
      {
        path: 'usuarios',
        title: 'Ver usuarios',
        component: VerUsuariosComponent,
      },
      {
        path: 'agregar-usuarios/:id',
        title: 'Agregar usuarios',
        component: AgregarUsuariosComponent,
      },
    ],
  },
  //si no encuentra la ruta, redirecciona al login
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];
