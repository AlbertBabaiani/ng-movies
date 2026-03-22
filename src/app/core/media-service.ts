import { computed, inject, Injectable, signal } from '@angular/core';
import { MediaItem } from '../shared/models/mediaItem';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';

type Filter = 'movies-tv-series' | 'movies' | 'tv-series' | 'bookmarked';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private firestore = inject(Firestore);
  private router = inject(Router);

  private mediaCollection = collection(this.firestore, 'media');

  private media$ = collectionData(this.mediaCollection, { idField: 'id' }) as Observable<
    MediaItem[]
  >;

  private routeFilter$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    tap(() => this.searchedWord.set('')),
    map((event) => {
      const url = event.urlAfterRedirects;
      if (url.includes('/movies')) return 'movies';
      if (url.includes('/tv-series')) return 'tv-series';
      if (url.includes('/bookmarked')) return 'bookmarked';

      return 'movies-tv-series';
    }),
  );

  private filter = toSignal(this.routeFilter$, { initialValue: 'movies-tv-series' as Filter });

  searchedWord = signal('');
  title = computed(() => {
    if (this.filter() === 'movies') return 'movies';
    if (this.filter() === 'tv-series') return 'TV series';
    if (this.filter() === 'bookmarked') return 'bookmarked shows';

    return 'movies or TV series';
  });

  private _media = toSignal(this.media$, { initialValue: [] });
  media = computed(() =>
    this._media().filter((m) => {
      const word = this.searchedWord().toLocaleLowerCase();

      let section = false;
      if (this.filter() === 'movies') section = m.category === 'Movie';
      else if (this.filter() === 'tv-series') section = m.category === 'TV Series';
      else if (this.filter() === 'bookmarked') section = m.isBookmarked === true;
      else section = true;

      if (!section) return false;

      if (!word) return true;

      const category = m.category.toLowerCase().includes(word);
      const rating = m.rating.toLowerCase().includes(word);
      const title = m.title.toLowerCase().includes(word);
      const year = m.year.toString().includes(word);

      return (category || rating || title || year) && section;
    }),
  );

  trendings = computed(() => this.media().filter((m) => m.isTrending));
}
