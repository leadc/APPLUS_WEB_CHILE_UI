import { Component } from '@angular/core';
import { Reserva, ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.css']
})
export class Paso3Component {

  public reserva: Reserva;

  constructor(private reservaService: ReservaService) {
    this.reserva = this.reservaService.reserva;
  }

  /**
   * Manja el evento del click en el botón siguiente para pasar al
   * siguiente paso de la reserva
   */
  public nextStep(){
    this.reservaService.nextStep();
  }
}