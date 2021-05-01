import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RecaptchaModule } from "ng-recaptcha";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { BannerReservaComponent } from './components/banner-reserva/banner-reserva.component';
import { Paso1Component } from './components/reserva/paso1/paso1.component';
import { Paso2Component } from './components/reserva/paso2/paso2.component';
import { Paso3Component } from './components/reserva/paso3/paso3.component';
import { Paso4Component } from './components/reserva/paso4/paso4.component';
import { ConfirmacionComponent } from './components/reserva/confirmacion/confirmacion.component';
import { SelectInputComponent } from './components/applus-shared/select-input/select-input.component';
import { InputDateComponent } from './components/applus-shared/input-date/input-date.component';

registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    ReservaComponent,
    BannerReservaComponent,
    Paso1Component,
    Paso2Component,
    Paso3Component,
    Paso4Component,
    ConfirmacionComponent,
    SelectInputComponent,
    InputDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
