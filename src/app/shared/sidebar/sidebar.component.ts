import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AppState } from '../../interfaces/appState.interface';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  public name: string = '';
  private router = inject(Router);
  private authService = inject(AuthService);
  private store = inject(Store<AppState>);
  private clearSubcription!: Subscription;

  ngOnInit(): void {
    this.clearSubcription = this.store.select('authReducer')
    .pipe( filter( ({ user }) => user !== null ) )
    .subscribe( ( { user } ) => this.name = user.name );
  }

  ngOnDestroy(): void {
    this.clearSubcription.unsubscribe()
  }

  logout(){
    this.authService.logout()
      .then( ( ) =>   this.router.navigate(['/auth/login']) )
      .catch( err => console.log(err))
  }


}
