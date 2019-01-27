import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable(  { providedIn: 'root' }
)
  export class UsuarioService {

    usuario: Usuario;
    token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    // console.log('Servicio de usuario listo');
    // this.cargarStorage(); lo traslade a estalogeado porque aqui
    // solo carga al inicio
  }

  estaLogeado() {
    this.cargarStorage();
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem( 'token' )) {
      this.token = localStorage.getItem( 'token' );
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  login( usuario: Usuario, recordar: boolean = false ) {
    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }


    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/loginMySql';


    return this.http
          .post( url, usuario )
          .pipe(
            map((res: any) => {
              localStorage.setItem('id', res.usuario._id );
              localStorage.setItem('token', res.token );
              localStorage.setItem('usuario', JSON.stringify( res.usuario ) );
              return true;
            })
          );

  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  crearUsuario( usuario: Usuario ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/usuarioMySql';

    return this.http.post( url, usuario );

  }
}
