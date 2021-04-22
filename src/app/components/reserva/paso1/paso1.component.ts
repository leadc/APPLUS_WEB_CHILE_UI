import { Component } from '@angular/core';
import { Reserva, ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css']
})
export class Paso1Component {

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
