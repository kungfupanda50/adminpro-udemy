import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
        return url + '/Sinimagen';
    }

    switch (tipo) {
      case 'usuarios':
         url += '/usuarios/' + img;
      break;
      case 'medicos':
         url += '/medicos/' + img;
      break;
      case 'hospitales':
         url += '/hospitales/' + img;
      break;
      default:
          console.log('Tipo de usuario no existe, únicamente usuarios, medicos y hospitales');
          return url + '/Sinimagen';
    }

    return url;
  }

}
