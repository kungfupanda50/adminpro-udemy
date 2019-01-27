import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// Este import no se pone aqui, ni la llamada en imports,
// sino en el app.module.ts

import {
   // SettingsService,
   SidebarService,
   SharedService,
   UsuarioService
} from './service.index';

@NgModule({
  imports: [
      CommonModule // , HttpClientModule
  ],
  providers: [
      // SettingsServices,
      SidebarService,
      SharedService
      // , UsuarioService aqui no se pone pues ya está en el decorador del usuarioservice
  ],
  declarations: []
})
export class ServiceModule { }

