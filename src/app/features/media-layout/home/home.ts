import { Component, inject } from '@angular/core';
import { MediaService } from '../../../core/media-service';
import { Trending } from '../../../components/trending/trending';
import { MediaGrid } from '../../../shared/components/media-grid/media-grid';

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
