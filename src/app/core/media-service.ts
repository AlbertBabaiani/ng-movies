import { computed, inject, Injectable, signal } from '@angular/core';
import { MediaItem } from '../shared/models/mediaItem';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private firestore = inject(Firestore);

  private mediaCollection = collection(this.firestore, 'media');

  private media$ = collectionData(this.mediaCollection, { idField: 'id' }) as Observable<
    MediaItem[]
  >;

  media = toSignal(this.media$, { initialValue: [] });

  trendings = computed(() => this.media().filter((m) => m.isTrending));
  movies = computed(() => this.media().filter((m) => m.category === 'Movie'));
  tvSeries = computed(() => this.media().filter((m) => m.category === 'TV Series'));
}
