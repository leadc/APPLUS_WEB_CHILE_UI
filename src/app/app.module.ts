import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { BannerReservaComponent } from './components/banner-reserva/banner-reserva.component';
import { Paso1Component } from './components/reserva/paso1/paso1.component';
import { Paso2Component } from './components/reserva/paso2/paso2.component';
import { Paso3Component } from './components/reserva/paso3/paso3.component';
import { Paso4Component } from './components/reserva/paso4/paso4.component';
import { ConfirmacionComponent } from './components/reserva/confirmacion/confirmacion.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservaComponent,
    BannerReservaComponent,
    Paso1Component,
    Paso2Component,
    Paso3Component,
    Paso4Component,
    ConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
