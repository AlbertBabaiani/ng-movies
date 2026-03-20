import { Component, inject } from '@angular/core';
import { MediaGrid } from '../../shared/components/media-grid/media-grid';
import { MediaService } from '../../core/media-service';

@Component({
  selector: 'app-tv-series',
  imports: [MediaGrid],
  templateUrl: './tv-series.html',
  styleUrl: './tv-series.scss',
})
export class TvSeries {
  private mediaService = inject(MediaService);

  tvSeries = this.mediaService.tvSeries;
}
