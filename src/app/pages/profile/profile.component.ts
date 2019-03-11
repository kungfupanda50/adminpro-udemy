import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  // imagenTemp: String; No se usó la variable de angular para previsualizar la imagen
  // sino se utilizó vanilla javascript
  iTemp: String;


  constructor(
    public _usuarioService: UsuarioService

    ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    console.log(this.usuario);


    this._usuarioService.actualizarUsuario( this.usuario )
              .subscribe(
                /* resp => {
                  console.log( resp );
              } */
           );
  }

  seleccionImage( archivo: File ) {
    // console.log( event );
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {
      swal('Sólo Imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    // tslint:disable-next-line:prefer-const
    let urlImagenTemp = reader.readAsDataURL( archivo );
    // console.log( urlImagenTemp );

    // La siguiente línea era con angular pero no funcionó en lugar de eso
    // se utiliza vanilla javascript
    // reader.onloadend = () => this.imagenTemp = reader.result.toString();
    reader.onloadend = () => document.images[ 'imagenTemp' ].src = reader.result as string;
    this.iTemp =  document.images[ 'imagenTemp' ].src;
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id.toString() );
  }

}
