import { AuthService } from '@auth/auth.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isLogged = false;
  private subscription: Subscription = new Subscription();

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.isLogged.subscribe((res) => (this.isLogged = res))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleToggleSidenav() {
    this.toggleSidenav.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
