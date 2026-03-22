import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { MediaCard } from '../../../shared/components/media-card/media-card';

import { register } from 'swiper/element/bundle';
import { MediaItem } from '../../../shared/models/mediaItem';

register();

@Component({
  selector: 'section[app-trending]',
  imports: [MediaCard],
  templateUrl: './trending.html',
  styleUrl: './trending.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Trending {
  trendings = input.required<MediaItem[]>();

  swiperBreakpoints = {
    0: {
      spaceBetween: 16,
    },
    768: {
      spaceBetween: 40,
    },
  };
}
