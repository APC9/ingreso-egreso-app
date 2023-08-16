import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ingresoEgresoOrden'
})
export class IngresoEgresoOrdenPipe implements PipeTransform {

  transform( items: IngresoEgreso[] ): IngresoEgreso[] {

    const newItems = [ ...items ];
    return newItems.sort( (a, b) => {
      if( a.tipo === 'ingreso'){
        return -1;
      }else{
        return 1;
      }
    })
  }

}
