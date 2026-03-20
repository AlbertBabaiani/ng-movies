import { Component, input } from '@angular/core';
import { MediaItem } from '../../models/mediaItem';
import { MediaCard } from '../media-card/media-card';

@Component({
  selector: 'section[app-media-grid]',
  imports: [MediaCard],
  templateUrl: './media-grid.html',
  styleUrl: './media-grid.scss',
})
export class MediaGrid {
  title = input.required<string>();
  media = input.required<MediaItem[]>();
}
