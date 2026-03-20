import { Component, input } from '@angular/core';
import { MediaItem } from '../../../shared/mediaItem';

@Component({
  selector: 'app-recommendation',
  imports: [],
  templateUrl: './recommendation.html',
  styleUrl: './recommendation.scss',
})
export class Recommendation {
  media = input.required<MediaItem[]>();
}
