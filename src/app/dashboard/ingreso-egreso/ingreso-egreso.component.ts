import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { AppState } from '../../interfaces/appState.interface';
import * as uiActions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public IngresoForm!: FormGroup;
  public fb = inject( FormBuilder );
  public tipo: string = '';
  public isLoading: boolean = false;

  private clearLoading!: Subscription;
  private store = inject( Store<AppState> );
  private ingresoEgresoService = inject( IngresoEgresoService );

  ngOnInit(): void {
      this.IngresoForm = this.fb.group({
        descripcion: [ '', [ Validators.required, Validators.minLength(3) ] ],
        monto: [ '', [ Validators.required, Validators.minLength(1) ] ],
      })

      this.clearLoading = this.store.select('uiReducer').subscribe( ui =>{
        this.isLoading = ui.isLoading;
      })
  }

  ngOnDestroy(): void {
    this.clearLoading.unsubscribe()
  }

  save(){
    if( this.IngresoForm.invalid || this.tipo === '') return;

    this.store.dispatch( uiActions.isLoading() );

    this.ingresoEgresoService.crearIngresoEgreso( { ...this.IngresoForm.value, tipo: this.tipo })
      .then( res => {
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire({
          icon:'success',
          title: 'Registro Exitoso',
          text: `${this.IngresoForm.get('descripcion')?.value} agregado correctamente`,
        })
        this.IngresoForm.reset()
        this.tipo = '';
      })
      .catch( err => {
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire('Error', err.message, 'error')
        this.tipo = '';
      });
  }

}
