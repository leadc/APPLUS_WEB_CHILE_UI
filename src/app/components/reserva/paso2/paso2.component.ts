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
  public cargando = true;
  public error: string;
  public validacion: string;

  constructor(private reservaService: ReservaService) {
    this.reserva = this.reservaService.reserva;
  }

  ngOnInit(){
    this.reservaService.buscarDisponibilidad().subscribe({
      next: resp => {
        this.cargando = false;
        this.procesarDisponibilidadDeFechas(resp.disponibilidad, resp.fechaActual);
      },
      error: resp => {
        console.log(resp);
        this.error = 'Se produjo un error al intentar obtener la disponibilidad, por favor vuelva a intentarlo luego.';
        this.cargando = false;
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
    const fechasDisponibles = [];
    this.disponibilidad.forEach(disp => fechasDisponibles.push(disp.fecha));

    const fechaArray = this.fechaActual.split('-');
    const meses = ['Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'];
    this.mesActual = meses[parseInt(fechaArray[1])];
    this.mesActual += ' ' + fechaArray[0];
    const primerDia = new Date(parseInt(fechaArray[0]), parseInt(fechaArray[1]) - 1, 1);
    const ultimoDia = new Date(parseInt(fechaArray[0]), parseInt(fechaArray[1]), 0);
    this.renderFechas = [];
    while(ultimoDia.getTime() >= primerDia.getTime()){
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
    const fecha = new Date(this.fechaActual);
    fecha.setMonth(fecha.getMonth()-1)
    this.reserva.fecha = undefined;
    this.reserva.hora = undefined;
    this.procesarDisponibilidadDeFechas(this.disponibilidad, fecha.toISOString().split('T')[0]);
  }

  /**
   * Renderiza los días del mes siguiente
   */
  public mesSiguiente(){
    const fecha = new Date(this.fechaActual);
    fecha.setMonth(fecha.getMonth()+1)
    this.reserva.fecha = undefined;
    this.reserva.hora = undefined;
    this.procesarDisponibilidadDeFechas(this.disponibilidad, fecha.toISOString().split('T')[0]);
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
