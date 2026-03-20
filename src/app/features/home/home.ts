import { Component, inject } from '@angular/core';
import { MediaService } from '../../core/media-service';
import { Trending } from './trending/trending';
import { MediaGrid } from '../../shared/components/media-grid/media-grid';
import { Search } from '../../components/search/search';

@Component({
  selector: 'app-home',
  imports: [Search, Trending, MediaGrid],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private mediaService = inject(MediaService);

  media = this.mediaService.media;
  trendings = this.mediaService.trendings;

  searchMedia(searchedWord: string) {
    this.mediaService.setFilter('movies-tv-series', searchedWord);
  }
}
