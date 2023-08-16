import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

    // sharts
import { NgChartsModule } from 'ng2-charts';

import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { EstadisticasComponent } from './ingreso-egreso/estadisticas/estadisticas.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { DashboardComponent } from './dashboard.component';
import { ingresoEgresoReducer } from './ingreso-egreso/ingreso-egreso.reducer';
import { IngresoEgresoOrdenPipe } from '../pipes/ingreso-egreso-orden.pipe';



@NgModule({
  declarations: [
    DetalleComponent,
    EstadisticasComponent,
    IngresoEgresoComponent,
    DashboardComponent,
    IngresoEgresoOrdenPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature( 'ingresoEgreso', ingresoEgresoReducer ),

    // sharts
    NgChartsModule,
  ]
})
export class DashboardModule { }
