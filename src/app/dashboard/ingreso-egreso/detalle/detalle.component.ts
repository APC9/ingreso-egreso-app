import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import Swal from 'sweetalert2';

import { IngresoEgreso } from '../../../models/ingreso-egreso.model';
import { AppState } from '../../../interfaces/appState.interface';
import { IngresoEgresoService } from '../../../services/ingreso-egreso.service';
import { deleteItem } from '../ingreso-egreso.actions';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy{


  public items: IngresoEgreso[] = [];
  public isLoading: boolean = true;

  private ingresoEgresoService = inject( IngresoEgresoService);
  private store = inject( Store<AppState>);
  private clearSubscription!: Subscription;

  ngOnInit(): void {
     this.clearSubscription = this.store.select('ingresoEgreso')
        .pipe(
          filter( ({items}) => items.length !== 0 ),
        )
        .subscribe( ({ items })=> {
          this.items = items
          this.isLoading = false
        })
  }

  ngOnDestroy(): void {
    this.clearSubscription.unsubscribe();
  }

  deleteItem( item: IngresoEgreso){
    Swal.fire({
      title: 'Esta seguro que deseas eliminar este Item?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ingresoEgresoService.deleteItemFirebase(item.uid!)
        this.store.dispatch( deleteItem({ item }) )
        Swal.fire(`${item.descripcion} eliminado correctamente`)
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


}
