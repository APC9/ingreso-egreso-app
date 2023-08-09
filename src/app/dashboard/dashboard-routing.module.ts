import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { EstadisticasComponent } from './ingreso-egreso/estadisticas/estadisticas.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
      { path: 'ingreso-egreso', component: IngresoEgresoComponent },
      { path: 'detalle', component: DetalleComponent },
      { path: 'estadisticas', component: EstadisticasComponent },
      { path: '**', redirectTo: ''}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
