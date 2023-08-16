import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Ingresos-app';

  private authService = inject(AuthService);
  private clearSubscription!: Subscription;

  ngOnInit(): void {
      this.clearSubscription = this.authService.initAuthListener()
  }

  ngOnDestroy(): void {
    this.clearSubscription.unsubscribe()
  }

}
