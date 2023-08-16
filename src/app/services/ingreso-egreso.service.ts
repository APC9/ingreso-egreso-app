import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, deleteDoc, getDocs, query, where } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  constructor() { }

  async crearIngresoEgreso({ descripcion, monto, tipo }:IngresoEgreso) {

    const uid = this.authService.user!.uid ;
    const uidItems = uuidv4();

    const collectionRef = collection(this.firestore, `${uid}/ingresos-egresos/Items`)
    return addDoc(collectionRef, { descripcion, monto, tipo, uid:uidItems });
  }

  initIngresosEgresosListener( uid: string ) {

    const ingresoEgresoRef = collection( this.firestore, `${uid}/ingresos-egresos/Items` );

    const data = collectionData( ingresoEgresoRef )
    return data;
  }

  async deleteItemFirebase(uidItems: string) {
    const uid = this.authService.user!.uid ;
    const itemRef = collection( this.firestore, `${uid}/ingresos-egresos/Items` );
    const q = query( itemRef, where('uid', '==', uidItems ) );
    const querySnapshot = ( await getDocs( q ) );
    querySnapshot.forEach( doc => {
      deleteDoc( doc.ref );
    });
  }



}
