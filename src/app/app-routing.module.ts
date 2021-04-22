import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Paso1Component } from './components/reserva/paso1/paso1.component';
import { Paso2Component } from './components/reserva/paso2/paso2.component';
import { Paso3Component } from './components/reserva/paso3/paso3.component';
import { Paso4Component } from './components/reserva/paso4/paso4.component';
import { ConfirmacionComponent } from './components/reserva/confirmacion/confirmacion.component';
import { ReservaComponent } from './pages/reserva/reserva.component';


const routes: Routes = [
  {
    path: '',
    component: ReservaComponent,
    children: [
      {path: 'fecha_y_hora', pathMatch: 'full', component: Paso2Component},
      {path: 'datos_reserva', pathMatch: 'full', component: Paso3Component},
      {path: 'medio_de_pago', pathMatch: 'full', component: Paso4Component},
      {path: 'confirmacion', pathMatch: 'full', component: ConfirmacionComponent},
      {path: '', pathMatch: 'full', component: Paso1Component},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
