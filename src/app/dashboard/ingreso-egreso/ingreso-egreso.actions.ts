import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';


export const setItems = createAction(
 '[IngresoEgreso Component] set Items',
 props<{ items: IngresoEgreso[] } >()
);

export const unSetItems = createAction(
 '[IngresoEgreso Component] unSet Items'
);

export const deleteItem = createAction(
 '[IngresoEgreso Component] dekete Item',
 props<{ item: IngresoEgreso } >()
);


