import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Reserva } from '../../../models/reserva.model';
import { ReservaService } from '../../../services/reserva.service';
import { PreloaderContainerComponent } from '../../applus-shared/preloader-container/preloader-container.component';

@Component({
  selector: 'app-cancelar-reserva',
  templateUrl: './cancelar-reserva.component.html',
  styleUrls: ['./cancelar-reserva.component.css']
})
export class CancelarReservaComponent implements OnInit {

  @Input() reserva: Reserva;
  @Output() cancelada: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(PreloaderContainerComponent) preloader: PreloaderContainerComponent;

  public errorsList: string[] = [];

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
  }

  getFechaReserva() {
    return this.reservaService.getFechaString(this.reserva.fecha.substr(0, 10));
  }

  cancelarReserva() {
    this.errorsList = [];
    this.preloader.block();
    this.reservaService.cancelarReserva(this.reserva.id, this.reserva.patente, this.reserva.codigo).subscribe(
      {
        next: (resp) => {
          this.preloader.unblock();
          this.cancelada.emit(true);
        },
        error: (resp) => {
          this.preloader.unblock();
          if (resp.error.mensaje) {
            this.errorsList.push(resp.error.mensaje);
          }
        }
      }
    );
  }

}
