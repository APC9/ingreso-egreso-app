import { Action, createReducer, on } from '@ngrx/store';

import { deleteItem, setItems, unSetItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

export interface State{
  items: IngresoEgreso[];
}

export const initialState: State = {
  items: [],
}


const _ingresoEgresoReducer = createReducer(
  initialState,
  on( setItems, (state, { items }) => {
    return {
      ...state,
     items:[ ...items],
    }
  }),
  on( deleteItem, (state, { item }) => ({
    ...state,
    items: state.items.filter( element => element.uid!== item.uid )
  } )),
  on( unSetItems, (state) => ({...state, items: [] } )),
);

export function ingresoEgresoReducer(state: State | undefined, action: Action) {
  return _ingresoEgresoReducer(state, action);
};


