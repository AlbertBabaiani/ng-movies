import { Component, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { MediaService } from '../../../core/media-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-media-preview',
  imports: [],
  templateUrl: './media-preview.html',
  styleUrl: './media-preview.scss',
})
export class MediaPreview {
  private mediaService = inject(MediaService);
  private router = inject(Router);
  private location = inject(Location);

  id = input.required<string>();

  private mediaDetails$ = toObservable(this.id).pipe(
    switchMap((currentId) => this.mediaService.getMediaById(currentId)),
  );

  media = toSignal(this.mediaDetails$);

  constructor() {
    effect(() => {
      const currentMovie = this.media();

      if (currentMovie === null) {
        this.router.navigate(['/']);
      }
    });
  }

  toggleBookmark() {
    const currentMedia = this.media();
    if (currentMedia) {
      this.mediaService.toggleBookmark(currentMedia.id!);
    }
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
