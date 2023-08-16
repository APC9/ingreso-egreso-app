import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../services/validators.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm!: FormGroup;
  public fb = inject(FormBuilder);
  public isLoading: boolean = false;

  private unsubscription!: Subscription;
  private router = inject(Router);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);
  private store = inject(Store<AppState>);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern( this.validatorsService.emailPattern )] ],
      password: ['', [Validators.required, Validators.minLength(6) ]]
    })


    this.unsubscription = this.store.select('uiReducer').subscribe( ui => {
      this.isLoading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.unsubscription.unsubscribe();
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField( this.loginForm, field )
  }

  login(){
    if ( this.loginForm.invalid ) return;
    this.store.dispatch(ui.isLoading() )

    this.authService.login( this.loginForm.value )
      .then( () => {
        this.store.dispatch(ui.stopLoading() )
        this.router.navigateByUrl( '/dashboard' )
      })
      .catch( err => {
        this.store.dispatch(ui.stopLoading() )
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message
        })
      });

  }
}
