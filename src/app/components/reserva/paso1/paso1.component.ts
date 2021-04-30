import { Component } from '@angular/core';
import { Reserva, BusquedaDeDisponibilidad } from 'src/app/models/reserva.model';
import { ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css']
})
export class Paso1Component {

  public reserva: Reserva;
  public busqueda: BusquedaDeDisponibilidad;

  constructor(private reservaService: ReservaService) {
    this.reserva = this.reservaService.reserva;
    this.busqueda = this.reservaService.busquedaDisponibilidad;
  }

  /**
   * Manja el evento del click en el botón siguiente para pasar al
   * siguiente paso de la reserva
   */
  public nextStep(){
    this.reservaService.nextStep();
  }

  ver(fecha: string){
    console.log("FECHA ES: " + fecha);
  }
}
