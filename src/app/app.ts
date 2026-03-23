import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './core/loading-service';
import { Spinner } from './shared/components/loading-spinner/spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ng-movies');

  private loadingService = inject(LoadingService);

  isLoading = this.loadingService.isLoading;
}
