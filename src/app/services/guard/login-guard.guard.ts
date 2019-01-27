import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
// este UsuarioServece no se deja llamar por medio del index

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router    // Esto es necesario siempre que se quiera usar  el navigate
    ) {}

  canActivate() {
    if ( this._usuarioService.estaLogeado() ) {
      console.log( 'Paso el Guard' );
      return true;
    } else {
      console.log( 'Bloqueado por el Guard' );
      this.router.navigate(['/login']);
      return false;
    }
  }
}
