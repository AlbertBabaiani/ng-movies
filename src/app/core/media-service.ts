import { computed, inject, Injectable, signal } from '@angular/core';
import { MediaItem } from '../shared/models/mediaItem';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

type Filter = 'movies-tv-series' | 'movies' | 'tv-series' | 'bookmarked';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private firestore = inject(Firestore);

  private mediaCollection = collection(this.firestore, 'media');

  private media$ = collectionData(this.mediaCollection, { idField: 'id' }) as Observable<
    MediaItem[]
  >;

  private filter = signal<Filter>('movies-tv-series');
  private searchedWord = signal('');

  private _media = toSignal(this.media$, { initialValue: [] });
  media = computed(() =>
    this._media().filter((m) => {
      const word = this.searchedWord().toLocaleLowerCase();

      if (!word.length) return true;

      const category = m.category.toLowerCase().includes(word);
      const rating = m.rating.toLowerCase().includes(word);
      const title = m.title.toLowerCase().includes(word);
      const year = m.year.toString().includes(word);

      return category || rating || title || year;
    }),
  );

  trendings = computed(() => this.media().filter((m) => m.isTrending));
  movies = computed(() => this._media().filter((m) => m.category === 'Movie'));
  tvSeries = computed(() => this._media().filter((m) => m.category === 'TV Series'));

  setFilter(filterType: Filter, searchedWord: string) {
    this.filter.set(filterType);
    this.searchedWord.set(searchedWord);
  }
}
