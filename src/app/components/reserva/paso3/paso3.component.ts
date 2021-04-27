import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { Reserva } from '../../../models/reserva.model';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.css']
})
export class Paso3Component {

  public reserva: Reserva;
  public valor: any = -1;

  constructor(private reservaService: ReservaService) {
    this.reserva = this.reservaService.reserva;
    this.reserva.idComoNosConocio = this.reserva.idComoNosConocio || '-1';
    this.reserva.idComuna = this.reserva.idComuna || '-1';
  }

  /**
   * Manja el evento del click en el botón siguiente para pasar al
   * siguiente paso de la reserva
   */
  public nextStep(){
    this.reservaService.nextStep();
  }

  public getFechaString(){
    return this.reservaService.getFechaString();
  }

  public getHoraString(){
    return this.reservaService.getHoraString();
  }

  public getPlantaString(){
    return this.reservaService.getPlantaString();
  }
}