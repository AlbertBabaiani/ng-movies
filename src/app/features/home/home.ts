import { Component, inject } from '@angular/core';
import { Recommendation } from './recommendation/recommendation';
import { MediaService } from '../../core/media-service';
import { Trending } from './trending/trending';

@Component({
  selector: 'app-home',
  imports: [Recommendation, Trending],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private mediaService = inject(MediaService);

  media = this.mediaService.media;
  trendings = this.mediaService.trendings;
}
