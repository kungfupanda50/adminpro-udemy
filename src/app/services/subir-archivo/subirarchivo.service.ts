import { Injectable } from '@angular/core';
import { resolve, reject } from 'q';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirarchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {

      // tslint:disable-next-line:no-shadowed-variable
      return new Promise( (resolve, reject ) => {
        const formData = new FormData();
        const xhr = new XMLHttpRequest;

        formData.append( 'imagen', archivo, archivo.name);
        xhr.onreadystatechange = function() {

          if ( xhr.readyState === 4 ) {  // 4 = totalmente terminado (subido)

            if ( xhr.status === 200 ) {
              console.log( 'Imagen subida' );
              resolve( JSON.parse( xhr.response ) );
              console.log( JSON.parse( xhr.response ) );
            } else {
              console.log( 'Fallo la subida, Status=' + xhr.status + ', archivo.name = ' + archivo.name );
              reject( xhr.response );
            }
          }
        };

        const url = URL_SERVICIOS + '/uploadMySql/' + tipo + '/' + id;
         console.log( url );
        xhr.open('PUT', url, true);
        xhr.send( formData );
      });
  }

}
