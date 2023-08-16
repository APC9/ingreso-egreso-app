import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { ValidatorsService } from '../../services/validators.service';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../interfaces/appState.interface';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy{

  public registeForm!: FormGroup;
  public isLoading: boolean = false;

  private unSubscribe!: Subscription;
  private router = inject( Router );
  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private validatorsService = inject( ValidatorsService );
  private store = inject( Store<AppState> );

  ngOnInit(): void {
    this.registeForm = this.fb.group({
      name: ['',  [ Validators.required, Validators.minLength(2) ]],
      email: ['',  [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ]],
      password: ['',  [ Validators.required, Validators.minLength(6) ]]
    });

    this.unSubscribe = this.store.select('uiReducer').subscribe( ui => {
      this.isLoading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
      this.unSubscribe.unsubscribe()
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.registeForm, field)
  }

  register(){

    if( this.registeForm.invalid )return;
    this.store.dispatch( ui.isLoading() )
/*     Swal.fire({                    // Spinner de SwalAlert
      title: 'Espere un momento...',
      didOpen: () => {
        Swal.showLoading()
      }
    }) */

    this.authService.crearUsuario( this.registeForm.value )
    .then( () =>  {
      /* Swal.close() */
      this.store.dispatch( ui.stopLoading() )
      this.router.navigateByUrl('/dashboard');
    })
    .catch( err => {
      this.store.dispatch( ui.stopLoading() )
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      })
    })
  this.registeForm.reset();

  }

}
