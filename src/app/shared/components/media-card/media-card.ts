import { Component, inject, input } from '@angular/core';
import { MediaItem } from '../../models/mediaItem';
import { MediaService } from '../../../core/media-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-card',
  imports: [RouterLink],
  templateUrl: './media-card.html',
  styleUrl: './media-card.scss',
})
export class MediaCard {
  media = input.required<MediaItem>();
  trending = input(false);

  private service = inject(MediaService);

  toggle() {
    this.service.toggleBookmark(this.media().id ?? '');
  }
}
