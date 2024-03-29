import { Component, OnInit, ViewChild } from '@angular/core';
import { Reserva } from 'src/app/models/reserva.model';
import { ReservaService } from '../../services/reserva.service';
import { TokenService } from '../../services/token.service';
import { PreloaderContainerComponent } from '../../components/applus-shared/preloader-container/preloader-container.component';

@Component({
  selector: 'app-gestionar-reserva',
  templateUrl: './gestionar-reserva.component.html',
  styleUrls: ['./gestionar-reserva.component.css']
})
export class GestionarReservaComponent implements OnInit {

  public patente = '';
  public codigo = '';
  public errorsList: string[] = [];
  public reserva: Reserva = null;
  public reservaCancelada = false;
  public captchaPublicKey: string = null;
  private captchaToken: string = null;

  @ViewChild('localizarForm') localizarForm: PreloaderContainerComponent;

  constructor(private reservaService: ReservaService, private tknService: TokenService) {
  }

  ngOnInit(): void {
    this.reservaService.checkCaptcha().subscribe({
      next: (resp: any) => {
        if (resp.data && resp.data.verificarCaptcha && resp.data.captchaPublicKey) {
          this.captchaPublicKey = resp.data.captchaPublicKey;
        }
      }
    });
  }

  /** Evento de click en localizar reserva */
  public localizarReservaClick() {
    this.localizarForm.block();
    this.patente = this.patente.toUpperCase();
    this.errorsList = [];
    if (!this.reservaService.validarPatente(this.patente)) {
      this.errorsList.push('Debe ingresar una patente válida');
      this.localizarForm.unblock();
      return;
    }

    if (this.captchaPublicKey && !this.captchaToken) {
      this.errorsList.push('Debe validar el captcha para continuar');
      this.localizarForm.unblock();
      return;
    }
    this.reservaService.localizarReserva(this.patente, this.codigo, this.captchaToken).subscribe({
      next: (resp: any) => {
        this.reserva = resp.data;
        this.localizarForm.unblock();
      },
      error: resp => {
        if (resp && resp.error && resp.error.mensaje) {
          this.errorsList.push(resp.error.mensaje);
        } else {
          this.errorsList.push('Se produjo un error al tratar de localizar la reserva, vuelva a intentarlo luego.');
        }
        this.localizarForm.unblock();
      }
    });
  }

  /**
   * Maneja el evento de cancelación de reserva
   * @param event Boolean, indica si la reserva fue cancelada con éxito
   */
  public reservaCanceladaEvent(event: boolean) {
    if (event) {
      this.reservaCancelada = event;
      this.tknService.clearToken();
    }
  }

  public resolved(captcha: string) {
    this.captchaToken = captcha;
  }
}
