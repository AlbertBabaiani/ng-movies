import { Component, input } from '@angular/core';
import { MediaItem } from '../../models/mediaItem';

@Component({
  selector: 'app-media-card',
  imports: [],
  templateUrl: './media-card.html',
  styleUrl: './media-card.scss',
})
export class MediaCard {
  media = input.required<MediaItem>();
  trending = input(false);
}
