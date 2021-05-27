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
    this.reserva = JSON.parse(JSON.stringify(this.reservaService.reserva));
    this.reservaService.finFlow();
    if(!this.reserva.fecha 
      || !this.reserva.hora 
      || !this.reserva.idPlanta
      || !this.reserva.codigo) {
      this.reservaService.resetFlow();
    }
  }

  public print(){
    window.print();
  }

  public getFechaString(){
    return this.reservaService.getFechaString(this.reserva.fecha);
  }

  public getHoraString(){
    return this.reservaService.getHoraString(
      new Date(this.reserva.fecha + ' ' + this.reserva.hora + ':00')
    );
  }

}
