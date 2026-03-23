import { Component, inject } from '@angular/core';
import { MediaGrid } from '../../../shared/components/media-grid/media-grid';
import { MediaService } from '../../../core/media-service';

@Component({
  selector: 'app-movies',
  imports: [MediaGrid],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {
  private mediaService = inject(MediaService);

  movies = this.mediaService.media;
}
