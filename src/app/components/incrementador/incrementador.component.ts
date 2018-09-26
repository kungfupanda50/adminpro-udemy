import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtprogress') nombreDesdeAng: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input('posicion') progreso: number = 50;

  @Output() cambiavalor:  EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  cuandoCambie( nuevoVal: number ) {

    // console.log(nuevoVal);
    // tslint:disable-next-line:prefer-const
    // let elementohtml: any = document.getElementsByName('progreso')[0];
    // elementohtml.value = this.progreso;

    this.nombreDesdeAng.nativeElement.value = this.progreso;

    if ( nuevoVal >= 100) {
      this.progreso = 100;
    } else {
      if (nuevoVal <= 0) {
        this.progreso = 0;
      } else {
        this.progreso = nuevoVal;
      }
    }

    this.cambiavalor.emit( this.progreso );

  }

cambiarValor( valor ) {
    if ( this.progreso + valor > 100 || this.progreso + valor < 0 ) { return; }

    this.progreso = this.progreso + valor;

    this.cambiavalor.emit( this.progreso );

    this.nombreDesdeAng.nativeElement.focus();
}

}
