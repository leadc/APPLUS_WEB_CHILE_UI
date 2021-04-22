import { Component } from '@angular/core';
import { Reserva, ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {

  public reserva: Reserva;

  constructor(private reservaService: ReservaService) {
    this.reserva = this.reservaService.reserva;
  }

}
