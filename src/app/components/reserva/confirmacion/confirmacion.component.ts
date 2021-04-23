import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { Reserva } from '../../../models/reserva.model';

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
