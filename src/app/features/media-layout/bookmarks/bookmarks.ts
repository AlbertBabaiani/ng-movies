import { Component, inject } from '@angular/core';
import { MediaGrid } from '../../../shared/components/media-grid/media-grid';
import { MediaService } from '../../../core/media-service';

@Component({
  selector: 'app-bookmarks',
  imports: [MediaGrid],
  templateUrl: './bookmarks.html',
  styleUrl: './bookmarks.scss',
})
export class Bookmarks {
  private mediaService = inject(MediaService);

  movies = this.mediaService.media;
}
