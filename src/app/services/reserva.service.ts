import { Location } from '@angular/common';
import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { Reserva, DataForm1 } from '../models/reserva.model';
import { ApiService, ApiResponse } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService implements OnDestroy {

  /** Datos de la reserva del cliente */
  public reserva: Reserva = new Reserva();
  /** Ruta actual donde se encuentra el navegador (sin incluir el dominio) */
  private currentRoute = '';
  /** Subscripción a los cambios de la ruta (Se usa para destruir la subscripción en caso de que este objeto ya no sea necesario) */
  private routeSubscription: Subscription;
  /** Pasos de la aplicación que coinciden con las rutas de los mismos */
  private FLOW_STEPS = [
    '',
    '/fecha_y_hora',
    '/datos_reserva',
    // '/medio_de_pago',
    '/confirmacion'
  ];

  constructor(private route: Router, private location: Location, private api: ApiService) {
    try{
      // Subscripción al observable de la ruta
      // Cada vez que cambie la ruta se actualizará el valor de
      // la variable currentRoute para determinar en qué paso estamos
      this.routeSubscription = this.route.events.subscribe((event) => {
          this.currentRoute = this.location.path();
      });
      this.getReservaDesdeStorage();
    }catch{}
  }

  /** 
   * Este método se ejecuta al destruir el objeto y se asegura que no quede activa
   * la subscripción a los cambios de ruta (para liberar memoria)
   */
  ngOnDestroy(){
    this.routeSubscription && this.routeSubscription.unsubscribe();
  }

  /**
   * Obtengo la reserva previa desde el session storage si es que existe 
   * Esto sirve para que si el cliente hace un refresh de la página sin cerrar el navegador 
   * no pierda los datos ya ingresados
   */
  private getReservaDesdeStorage() {
    const reservaStorage = sessionStorage.getItem('reserva');
    this.reserva = reservaStorage ? new Reserva(JSON.parse(reservaStorage)) : new Reserva();
  }

  /**
   * Obtiene los datos necesarios para el form del paso 1
   * @returns Observable de los datos necesarios para el form del paso 1
   */
  public getDataFormPaso1(){
    return this.api.get('reservas/obtenerDataPaso1', null).pipe(
      map(
        (resp: ApiResponse) => {
          return resp.data ? resp.data : resp;
        }
      )
    );
  }

  /**
   * Obtiene la disponibilidad de turnos para un mes actual o la cantidad de meses en el futuro de mesOffset
   * @param mesOffset cantidad de meses en el futuro para traer la disponibilidad
   * @returns Devuelve un observable de los resultados de la llamada a la API
   */
  buscarDisponibilidad(mesesAdelantados = 0){
    return this.api.get('reservas/obtenerDisponibilidad', {
      centro: this.reserva.idPlanta,
      mesesAdelantados
    }).pipe(
      map(
        (resp: ApiResponse) => {
          return resp.data ? resp.data : resp;
        }
      )
    );
  }

  /**
   * Obtiene los datos necesarios para el form del paso 3
   * @returns Observable de los datos necesarios para el form del paso 3
   */
   public getDataFormPaso3(){
    return this.api.get('reservas/obtenerDataPaso3', null).pipe(
      map(
        (resp: ApiResponse) => {
          return resp.data ? resp.data : resp;
        }
      )
    );
  }

  /**
   * Realiza la llamada a la API para registrar una reserva
   * @param tokenCaptcha token del captcha
   * @returns Devuelve el observable de la llamada
   */
  public realizarReserva(tokenCaptcha: string){
    return this.api.post('reservas/reservar', {
      reserva: this.reserva,
      captcha: tokenCaptcha
    });
  }

  /**
   * Maneja los eventos de pasar al siguiente paso de la reserva 
   * guardando los datos actuales en session storage
   */
  public nextStep(){
    // Guardo los datos de la reserva en session storage
    // Se usa JSON.stringify para convertir la reserva en un JSON string
    sessionStorage.setItem('reserva', JSON.stringify(this.reserva));
    // Recorro cada paso para evaluar en cuál estoy y navego al siguiente (si es que hay siguiente, sino no hago nada)
    this.FLOW_STEPS.forEach((value, i) => {
      if (value === this.currentRoute && this.FLOW_STEPS[i+1]) {
        this.route.navigate([this.FLOW_STEPS[i+1]]);
      }
    });
  }

  /**
   * Maneja los eventos de pasar al anterior paso de la reserva 
   */
   public backStep(){
    // Recorro cada paso para evaluar en cuál estoy y navego al siguiente (si es que hay siguiente, sino no hago nada)
    this.FLOW_STEPS.forEach((value, i) => {
      if (value === this.currentRoute && this.FLOW_STEPS[i-1]) {
        this.route.navigate([this.FLOW_STEPS[i-1]]);
      }
    });
  }

  public finFlow(){
    sessionStorage.clear();
    this.reserva = new Reserva();
  }

  /**
   * Reinicia el flujo del programa en caso de navegar a una ruta del paso 2, 3... 
   * sin tener datos previos seleccionados
   */
  public resetFlow(){
    sessionStorage.clear();
    this.route.navigate([this.FLOW_STEPS[0]]);
  }

  /**
   * Devuelve un string de la fecha actual para el resumen
   */
  public getFechaString(fecha = null){
    fecha = fecha || this.reserva.fecha;
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diaDate = new Date(fecha + ' 00:00:00');
    return dias[diaDate.getDay()] + ' ' + diaDate.getDate() + ' de ' + meses[diaDate.getMonth()] + ' de ' + diaDate.getFullYear();
  }

  /**
   * Devuelve la hora en formato HH:MM string
   * @param date Fecha de la que obtener la hora
   */
   public getHoraString(dateObj: Date = null){
    const date = dateObj || new Date(this.reserva.fecha + ' ' + this.reserva.hora + ':00');
    const hh = date.getHours();
    const mm = date.getMinutes();
    return [
        (hh > 9 ? '' : '0') + hh,
        (mm > 9 ? '' : '0') + mm
      ].join(':');
  }

  /**
   * Valida el formato de una patente (que esté en mayúsculas y tenga la cantidad de letras y números en el orden correcto)
   * @param patente Patente a validar
   * @returns True/false según la patente sea válida o no
   */
  public validarPatente(patente: string): boolean {
    const regx = /^(([A-Z]{2}[0-9]{4})|([A-Z]{3}[0-9]{3})|([A-Z]{4}[0-9]{2}))$/;
    return regx.test(patente);
  }

  /**
   * Realiza la llamada a la API para buscar una reserva y devuelve el observable de la misma
   * @param patente Patente buscada
   * @param codigo Código de reserva buscado
   * @param captchaToken Captchatoken en caso de ser necesario
   */
  public localizarReserva(patente: string, codigo: string, captchaToken?: string) {
    return this.api.get('reservas/localizar', { patente, codigo, captchaToken });
  }

  /**
   * Realiza la llamada a la API para cancelar una reserva
   * @param idReserva Número de la reserva que se desea cancelar
   */
  public cancelarReserva(id: number, patente: string, codigo: string) {
    return this.api.delete('reservas/reserva', { patente, codigo, id });
  }
}
