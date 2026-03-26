import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './core/loading-service';
import { Spinner } from './shared/components/loading-spinner/spinner';
import { Notification } from './shared/components/notification/notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Spinner, Notification],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ng-movies');

  private loadingService = inject(LoadingService);

  isLoading = this.loadingService.isLoading;
}
