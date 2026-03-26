import { Component, inject } from '@angular/core';
import { MediaService } from '../../../core/media-service';
import { MediaGrid } from '../../../shared/components/media-grid/media-grid';
import { Trending } from '../../../shared/components/trending/trending';

@Component({
  selector: 'app-home',
  imports: [Trending, MediaGrid],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private mediaService = inject(MediaService);

  media = this.mediaService.media;
  trending = this.mediaService.trending;
}
