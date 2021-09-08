import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { Reserva, Disponibilidad } from '../../../models/reserva.model';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.css']
})
export class Paso2Component implements OnInit {

  public reserva: Reserva;
  public renderFechas: any[] = [];
  public renderHoras: any[] = [];
  public disponibilidad: Disponibilidad[] = [];
  public fechaActual = '';
  public mesActual = '';
  public mesActualOffset = 0;
  public cargando = true;
  public error: string;
  public validacion: string;
  public MAX_MESES = 6;

  constructor(private reservaService: ReservaService) {
    this.reserva = this.reservaService.reserva;
    if (!this.reserva.idPlanta) {
      this.reservaService.resetFlow();
    }
  }

  ngOnInit(){
    this.solicitarDisponibilidadMes(0);
  }

  /**
   * Solicita la disponibilidad horaria para un mes en particular y la muestra en la vista
   * @param agregarMes Numero de meses de offset a agregar
   */
  private solicitarDisponibilidadMes(agregarMes: number) {
    this.mesActualOffset += agregarMes;
    this.reserva.fecha = undefined;
    this.reserva.hora = undefined;
    this.cargando = true;
    this.reservaService.buscarDisponibilidad(this.mesActualOffset).subscribe({
      next: resp => {
        this.cargando = false;
        this.procesarDisponibilidadDeFechas(resp.disponibilidad, resp.fechaActual);
      },
      error: resp => {
        this.cargando = false;
        this.error = 'Se produjo un error al solicitar turnos disponibles';
      }
    });
  }

  /**
   * Procesa la disponibilidad de días y horarios a mostrar
   * @param disponibilidad Disponibilidad recibida desde el back end
   * @param fechaActual Fecha actual del mes que se quiere renderizar
   */
  private procesarDisponibilidadDeFechas(disponibilidad: Disponibilidad[], fechaActual: string){
    this.disponibilidad = disponibilidad;
    this.fechaActual = fechaActual;
    const fechasDisponibles = this.disponibilidad.map(disp => disp.fecha);

    const fechaArray = this.fechaActual.split('-');
    // tslint:disable-next-line: radix
    const primerDia = new Date(parseInt(fechaArray[0]), parseInt(fechaArray[1]) - 1, 1);
    // tslint:disable-next-line: radix
    const ultimoDia = new Date(parseInt(fechaArray[0]), parseInt(fechaArray[1]), 0);
    const meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    // tslint:disable-next-line: radix
    this.mesActual = meses[parseInt(fechaArray[1])];
    this.mesActual += ' ' + fechaArray[0];
    this.renderFechas = [];
    while (ultimoDia.getTime() >= primerDia.getTime()) {
      const fechaActualString = primerDia.toISOString().split('T')[0];
      this.renderFechas.push({
        val: fechaActualString,
        disponible: fechasDisponibles.includes(fechaActualString)
      });
      primerDia.setDate(primerDia.getDate() + 1);
    }
    this.procesarDisponibilidadDeHoras();
  }

  /**
   * Setea la fecha seleccionada en la reserva
   * @param fecha fecha seleccionada
   */
  public seleccionarFecha(fecha: string){
    this.reserva.fecha = new Date(fecha).toISOString().split('T')[0];
    this.reserva.hora = undefined;
    this.procesarDisponibilidadDeHoras();
    this.validacion = null;
  }

  /**
   * Procesa la disponibilidad de horas según la fecha seleccionada
   */
  private procesarDisponibilidadDeHoras(){
    const horaInicio = new Date(this.fechaActual + 'T07:00:00');
    const horaFin = new Date(this.fechaActual + 'T20:00:00');
    const dispSeleccionadaRef = this.disponibilidad.find(disp => disp.fecha === this.reserva.fecha);
    this.renderHoras = [];
    while (horaInicio.getTime() < horaFin.getTime()) {
      const horaString = this.getHoraString(horaInicio);
      const disponible = dispSeleccionadaRef && !!dispSeleccionadaRef.horasDisponibles.find(horaDisp => {
        return horaDisp.hora === horaString && horaDisp.cantidad > 0;
      });
      this.renderHoras.push({val: horaString, disponible})
      horaInicio.setMinutes(horaInicio.getMinutes() + 15);
    }
  }

  /**
   * Setea la hora seleccionada en la reserva actual
   * @param hora Hora seleccionada
   */
  public seleccionarHora(hora: string){
    this.reserva.hora = hora;
    this.validacion = null;
  }

  /**
   * Renderiza los días del mes anterior
   */
  public mesAnterior(){
    this.mesActualOffset > 0 && this.solicitarDisponibilidadMes(-1);
  }

  /**
   * Renderiza los días del mes siguiente
   */
  public mesSiguiente(){
    this.mesActualOffset < this.MAX_MESES && this.solicitarDisponibilidadMes(1);
  }

  /**
   * Devuelve un string de la fecha actual para el resumen
   */
  public getDiaResumen(){
    return this.reservaService.getFechaString();
  }

  /**
   * Devuelve la hora en formato HH:MM string
   * @param date Fecha de la que obtener la hora
   */
  private getHoraString(date: Date){
    return this.reservaService.getHoraString(date);
  }

  /**
   * Manja el evento del click en el botón siguiente para pasar al
   * siguiente paso de la reserva
   */
  public nextStep(){
    if (!this.reserva.fecha || !this.reserva.hora) {
      this.validacion = 'Debe seleccionar una fecha y hora antes de continuar.';
      return;
    }
    this.reservaService.nextStep();
  }

}
