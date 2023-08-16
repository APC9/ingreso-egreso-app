import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AppState } from '../../interfaces/appState.interface';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy{

  public name: string = '';

  private store = inject(Store<AppState>);
  private clearSubscription!: Subscription;

  ngOnInit(): void {
    this.clearSubscription = this.store.select('authReducer')
      .pipe(
        filter( auth => auth.user !== null ),
      )
      .subscribe( ({user}) => this.name = user.name );
  }

  ngOnDestroy(): void {
    this.clearSubscription.unsubscribe()
  }

}
