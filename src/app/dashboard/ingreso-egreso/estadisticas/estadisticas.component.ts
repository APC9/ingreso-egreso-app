import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

import { AppState } from '../../../interfaces/appState.interface';
import { IngresoEgreso } from '../../../models/ingreso-egreso.model';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: [
  ]
})
export class EstadisticasComponent implements OnInit {

  public ingreso: number = 0;
  public egreso : number = 0;
  public totalIngreso: number = 0;
  public totalEgreso: number = 0;

   // Doughnut
  public doughnutChartLabels: string[] = [
    'Egresos',
    'Ingresos',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  private store = inject(Store<AppState>)


  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe( ({ items}) => this.generarEstadisticas(items) );
  }

  generarEstadisticas( items: IngresoEgreso[] ) {
    for( const item of items ) {
      if(item.tipo === 'ingreso') {
        this.totalIngreso += item.monto;
        this.ingreso ++;
      }else{
        this.totalEgreso += item.monto;
        this.egreso ++;
      }
    }

    this.doughnutChartData.datasets[0].data = [this.totalEgreso, this.totalIngreso];
  }
}
