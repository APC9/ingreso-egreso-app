import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { EstadisticasComponent } from './ingreso-egreso/estadisticas/estadisticas.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    DetalleComponent,
    EstadisticasComponent,
    IngresoEgresoComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
