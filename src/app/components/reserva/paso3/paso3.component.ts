import { Component, OnDestroy } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { Reserva } from '../../../models/reserva.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.css']
})
export class Paso3Component implements OnDestroy{

  public reserva: Reserva;
  public valor: any = -1;
  private captchaSubcription: Subscription;

  constructor(private reservaService: ReservaService) {
    this.reserva = this.reservaService.reserva;
    this.reserva.idComoNosConocio = this.reserva.idComoNosConocio || '-1';
    this.reserva.idComuna = this.reserva.idComuna || '-1';
  }

  ngOnDestroy(){
    this.captchaSubcription && this.captchaSubcription.unsubscribe();
  }

  public resolved(resolved: string){
    console.log(`Resolved captcha with response: ${resolved}`);
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