import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva.model';
import { ReservaService } from '../../../services/reserva.service';
import { DataForm1, Planta, Region } from '../../../models/reserva.model';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css']
})
export class Paso1Component implements OnInit {

  public reserva: Reserva;
  public busqueda: {centro: string, region: string} = {
    centro: '-1',
    region: '-1'
  };
  public regiones: Region[] = [];
  public plantasList: Planta[] = [];
  public mensajesError: string[] = [];

  constructor(private reservaService: ReservaService) {
    this.reserva = this.reservaService.reserva;
    this.reserva.idPlanta = null;
    this.reserva.descripcionPlanta = null;
    this.reserva.observacionPlanta = null;
  }
  
  ngOnInit() {
    this.reservaService.getDataFormPaso1().subscribe({
      next: (data: DataForm1) => {
        this.regiones = data.regiones;
      },
      error: (resp) => {
        console.log(resp)
      }
    });
  }

  /**
   * Manja el evento del click en el botón siguiente para pasar al
   * siguiente paso de la reserva
   */
  public nextStep(){
    this.mensajesError = [];
    if (!this.reserva.idPlanta) {
      this.mensajesError.push('Debe seleccionar una planta');
      return;
    }
    this.reservaService.nextStep();
  }

  public seleccionarRegion(){
    this.busqueda.centro = '-1';
    this.reserva.idPlanta = null;
    this.reserva.descripcionPlanta = null;
    this.reserva.observacionPlanta = null;
    this.regiones.forEach((region) => {
      if (this.busqueda.region === region.id.toString()) {
        this.plantasList = region.plantas;
      }
    });
  }

  public seleccionarPlanta(){
    this.mensajesError = [];
    this.plantasList.forEach((planta) => {
      if (this.busqueda.centro === planta.id.toString()) {
        this.reserva.idPlanta = planta.id;
        this.reserva.descripcionPlanta = planta.nombre;
        this.reserva.observacionPlanta = planta.observacion;
      }
    });
  }
}
