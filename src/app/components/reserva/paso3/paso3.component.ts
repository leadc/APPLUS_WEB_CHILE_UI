import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { Reserva } from '../../../models/reserva.model';
import { PreloaderContainerComponent } from '../../applus-shared/preloader-container/preloader-container.component';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.css']
})
export class Paso3Component implements OnInit{

  @ViewChild('preloaderContainer') preloader: PreloaderContainerComponent;

  public reserva: Reserva;
  public valor: any = -1;
  public comunas: { id: number, descripcion: string}[] = [];
  public comoNosConocio: { id: number, descripcion: string}[] = [];
  public verificarCaptcha = false;
  private captchaResolved: any = null;
  public controlEmail = '';
  public mensajesError: string[] = [];


  constructor(private reservaService: ReservaService){
    this.reserva = this.reservaService.reserva;
    this.reserva.idComoNosConocio = this.reserva.idComoNosConocio || '-1';
    this.reserva.idComuna = this.reserva.idComuna || '-1';
    if (!this.reserva.fecha || !this.reserva.hora || !this.reserva.idPlanta) {
      this.reservaService.resetFlow();
    }
  }

  ngOnInit(){
    if (!this.reserva.fecha || !this.reserva.hora) {
      this.reservaService.backStep();
    } else {
      this.reservaService.getDataFormPaso3().subscribe({
        next: resp => {
          this.comoNosConocio = resp.comoNosConocio;
          this.comunas = resp.comunas;
          this.verificarCaptcha = resp.verificarCaptcha;
        },
        error: resp => {
          location.reload();
        }
      });
    }
  }

  public resolved(resolved: string){
    this.captchaResolved = resolved;
  }

  /**
   * Manja el evento del click en el botón de confirmar reserva
   * siguiente paso de la reserva
   */
  public confirmar(){
    if (this.validar()) {
      this.preloader.block();
      this.reservaService.realizarReserva(this.captchaResolved).subscribe({
        next: (resp: any) => {
          this.preloader.unblock();
          this.reserva.codigo = resp.data;
          this.reservaService.nextStep();
        },
        error: (resp: any) => {
          this.preloader.unblock();
          this.mensajesError.push(resp.error.mensaje);
        }
      });
    }
  }

  /**
   * Validates the current values for the form an shows error messages if neccessary
   * @returns boolean that indicates whether the form is valid
   */
  private validar(): boolean{
    this.mensajesError = [];
    this.upperCaseFields();
    !this.validarPatente() && this.mensajesError.push('Debe ingresar una patente válida.');
    !this.reserva.nombre && this.mensajesError.push('Debe ingresar su nombre.');
    !this.reserva.apellido && this.mensajesError.push('Debe ingresar su apellido.');
    !this.reserva.rut && this.mensajesError.push('Debe ingresar su rut.');
    !this.reserva.telefono && this.mensajesError.push('Debe ingresar su teléfono.');
    const mailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    !mailRe.test(this.reserva.email) && this.mensajesError.push('Debe ingresar un email válido.');
    this.reserva.email !== this.controlEmail && this.mensajesError.push('La confirmación de correo electrónico no coincide con el correo ingresado.');
    this.reserva.idComoNosConocio === '-1' && this.mensajesError.push('Por favor indique como nos conoció.');
    this.reserva.idComuna === '-1' && this.mensajesError.push('Por favor indique su comuna.');
    this.verificarCaptcha && !this.captchaResolved && this.mensajesError.push('Debe resolver el captcha.');
    return !!!this.mensajesError.length;
  }

  private upperCaseFields(): void {
    this.reserva.patente = this.reserva.patente ? this.reserva.patente.toUpperCase().trim() : undefined;
    this.reserva.nombre =  this.reserva.nombre ? this.reserva.nombre.toUpperCase().trim() : undefined;
    this.reserva.apellido =  this.reserva.apellido ? this.reserva.apellido.toUpperCase().trim() : undefined;
    this.reserva.rut =  this.reserva.rut ? this.reserva.rut.toUpperCase().trim() : undefined;
    this.reserva.telefono =  this.reserva.telefono ? this.reserva.telefono.toUpperCase().trim() : undefined;
  }

  private validarPatente(): boolean {
    const regx = /^(([A-Z]{2}[0-9]{4})|([A-Z]{3}[0-9]{3})|([A-Z]{4}[0-9]{2}))$/;
    return regx.test(this.reserva.patente);
  }

  public getFechaString(){
    return this.reservaService.getFechaString();
  }

  public getHoraString(){
    return this.reservaService.getHoraString();
  }
}
