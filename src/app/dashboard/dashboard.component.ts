import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../interfaces/appState.interface';
import { Subscription, filter } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from './ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  private clearSubscription!: Subscription;
  private clearIngresoEgresoSubscription!: Subscription;
  private store = inject(Store<AppState>)
  private ingresoEgresoService = inject(IngresoEgresoService)

  ngOnInit(): void {
      this.clearSubscription = this.store.select('authReducer')
      .pipe(
        filter( (auth) => auth.user !== null )
      )
      .subscribe( auth => {
        this.clearIngresoEgresoSubscription = this.ingresoEgresoService.initIngresosEgresosListener(auth.user.uid)
          .subscribe(
            resp => {
              const items = resp as IngresoEgreso[];
              this.store.dispatch( ingresoEgresoActions.setItems({items}) );
          }
        )
      })

  }

  ngOnDestroy(): void {
    this.clearSubscription.unsubscribe()
    this.clearIngresoEgresoSubscription.unsubscribe()
    this.store.dispatch( ingresoEgresoActions.unSetItems())
  }
}
