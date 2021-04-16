import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { BannerReservaComponent } from './components/banner-reserva/banner-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservaComponent,
    BannerReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
