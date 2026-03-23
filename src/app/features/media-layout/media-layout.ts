import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Search } from '../../components/search/search';
import { IsLoadingDirective } from '../../shared/directives/is-loading';
import { LoadingService } from '../../core/loading-service';

@Component({
  selector: 'app-media-layout',
  imports: [RouterOutlet, Navbar, Search, IsLoadingDirective],
  templateUrl: './media-layout.html',
  styleUrl: './media-layout.scss',
})
export class MediaLayout {
  private loadingService = inject(LoadingService);

  isLoading = this.loadingService.isLoading;
}
