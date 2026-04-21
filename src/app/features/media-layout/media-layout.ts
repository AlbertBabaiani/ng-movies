import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Search } from '../../components/search/search';
import { LoadingService } from '../../core/loading-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-media-layout',
  imports: [RouterOutlet, Navbar, Search],
  templateUrl: './media-layout.html',
  styleUrl: './media-layout.scss',
})
export class MediaLayout {
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  isLoading = this.loadingService.isLoading;

  isMovieRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.startsWith('/movie/')),
    ),
    { initialValue: this.router.url.startsWith('/movie/') },
  );
}
