import { Injectable, inject } from '@angular/core';
import { Auth, Unsubscribe, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { AppState } from '../interfaces/appState.interface';
import * as authActions from '../auth/auth.action';
import { unSetItems } from '../dashboard/ingreso-egreso/ingreso-egreso.actions';

interface user{
  name?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: Usuario | null;
  private userUnsubscribe!: Unsubscribe;
  private store = inject( Store<AppState>);
  private firestore = inject( Firestore );
  private auth = inject( Auth );

  get user(){
    return this._user;
  }

  constructor() { }

  initAuthListener(){
    return authState(this.auth).subscribe( async fUser => {
      if (fUser) {
        const userRef = collection(this.firestore, 'usuarios')
        const q = query(userRef, where("uid", "==", fUser.uid));
        const querySnapshot = (await getDocs(q))
        querySnapshot.forEach((doc: any) => {
          this._user = doc.data();
          this.store.dispatch(authActions.setUser({user: doc.data()}))
        })
      } else {
        this._user = null;
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(authActions.unSetUser());
      }
    })
  }

  async crearUsuario({ name = '', email, password}:user) {
   return createUserWithEmailAndPassword( this.auth, email, password )
            .then( ({ user }) => {
              const newUser = new Usuario( user.uid, name, email );
              const userRef = collection( this.firestore, 'usuarios' )
              return addDoc( userRef, {...newUser} );
            })
  }

  login({ email, password }:user){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  async logout(){
    return signOut(this.auth).then( () => this.store.dispatch( unSetItems() ))
  }

  isAuth(){
    return new Observable( subcriber => {
      const unsubscribe = this.auth.onAuthStateChanged( subcriber );
      return { unsubscribe };
    }).pipe(
      map( fuser => fuser !== null )
    )
  }
}
