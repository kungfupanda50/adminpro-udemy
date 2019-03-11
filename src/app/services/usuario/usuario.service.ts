import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SubirarchivoService } from '../subir-archivo/subirarchivo.service';

@Injectable(  { providedIn: 'root' }
)
  export class UsuarioService {

    usuario: Usuario;
    token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirarchivoService
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

  guardarStorage( id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario) );
        this.usuario = usuario;
        this.token = token;
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

  actualizarUsuario( usuario: Usuario ) {

      let url = URL_SERVICIOS + '/usuarioMySql/' + usuario._id;
      url += '?token=' + this.token;
      // console.log( url );

      return this.http.put( url, usuario )
          .pipe(
            map((res: any) => {
              this.guardarStorage( res.usuario._id, this.token, res.usuario );
              swal('Usuario Actualizado', usuario.nombre, 'success' );
              return true;
            })
          );
  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {
            console.log( archivo );
            this.usuario.img = resp.imgNueva;
            swal( 'Imagen Actualizada', this.usuario.nombre, 'success');
            this.guardarStorage( id, this.token, this.usuario );
          })
          .catch( resp => {
            console.log( resp );
          });
  }
}


// El problema es que esta sobreescribiendo el password

