import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { Reserva, BusquedaDeDisponibilidad } from '../models/reserva.model';
import { ApiService, ApiResponse } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService implements OnDestroy {

  /** Datos de la reserva del cliente */
  public reserva: Reserva = new Reserva();
  /** Datos para la busqueda de disponibilidad */
  public busquedaDisponibilidad: BusquedaDeDisponibilidad = new BusquedaDeDisponibilidad();
  /** Ruta actual donde se encuentra el navegador (sin incluir el dominio) */
  private currentRoute = '';
  /** Subscripción a los cambios de la ruta (Se usa para destruir la subscripción en caso de que este objeto ya no sea necesario) */
  private routeSubscription: Subscription;
  /** Pasos de la aplicación que coinciden con las rutas de los mismos */
  private FLOW_STEPS = [
    '',
    '/fecha_y_hora',
    '/datos_reserva',
    '/medio_de_pago',
    '/confirmacion'
  ];

  constructor(private route: Router, private location: Location, private api: ApiService) {
    try{
      // Subscripción al observable de la ruta 
      // Cada vez que cambie la ruta se actualizará el valor de 
      // la variable currentRoute para determinar en qué paso estamos
      this.routeSubscription = this.route.events.subscribe(() => {
          this.currentRoute = location.path();
      });
      // Obtengo la reserva previa desde el session storage si es que existe
      // Esto sirve para que si el cliente hace un refresh de la página sin cerrar el navegador
      // no pierda los datos ya ingresados
      const reservaStorage = sessionStorage.getItem('reserva');
      this.reserva = reservaStorage ? new Reserva(JSON.parse(reservaStorage)) : new Reserva();
      const busqueda = sessionStorage.getItem('busqueda');
      this.busquedaDisponibilidad = busqueda ? new BusquedaDeDisponibilidad(JSON.parse(busqueda)) : new BusquedaDeDisponibilidad();
    }catch{}
  }

  /**
   * Obtiene la disponibilidad de turnos para una planta y rango de fechas
   * @returns Devuelve un observable de los resultados de la llamada a la API
   */
  buscarDisponibilidad(){
    return this.api.get('reservas/obtenerDisponibilidad', this.busquedaDisponibilidad).pipe(
      map(
        (resp: ApiResponse) => {
          return resp.data ? resp.data : resp;
        }
      )
    );
  }

  /** 
   * Este método se ejecuta al destruir el objeto y se asegura que no quede activa
   * la subscripción a los cambios de ruta (para liberar memoria)
   */
  ngOnDestroy(){
    this.routeSubscription && this.routeSubscription.unsubscribe();
  }

  /**
   * Maneja los eventos de pasar al siguiente paso de la reserva 
   * guardando los datos actuales en session storage
   */
  public nextStep(){
    // Guardo los datos de la reserva en session storage
    // Se usa JSON.stringify para convertir la reserva en un JSON string
    sessionStorage.setItem('reserva', JSON.stringify(this.reserva));
    sessionStorage.setItem('busqueda', JSON.stringify(this.busquedaDisponibilidad));
    // Recorro cada paso para evaluar en cuál estoy y navego al siguiente (si es que hay siguiente, sino no hago nada)
    this.FLOW_STEPS.forEach((value, i) => {
      if (value === this.currentRoute && this.FLOW_STEPS[i+1]) {
        this.route.navigate([this.FLOW_STEPS[i+1]]);
      }
    });
  }
}
