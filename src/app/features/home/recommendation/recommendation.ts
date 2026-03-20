import { Component, input } from '@angular/core';
import { MediaItem } from '../../../shared/models/mediaItem';
import { MediaCard } from '../../../shared/components/media-card/media-card';

@Component({
  selector: 'section[app-recommendation]',
  imports: [MediaCard],
  templateUrl: './recommendation.html',
  styleUrl: './recommendation.scss',
})
export class Recommendation {
  media = input.required<MediaItem[]>();
}
