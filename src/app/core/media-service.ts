import { computed, inject, Injectable, signal } from '@angular/core';
import { MediaItem } from '../shared/models/mediaItem';
import {
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, defer, Observable, of } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, filter, finalize, map, startWith, switchMap, tap } from 'rxjs/operators'; // <-- Added catchError
import { LoadingService } from './loading-service';
import { AuthService } from './auth-service';
import { NotificationService } from './notification-service';

type Filter = 'movies-tv-series' | 'movies' | 'tv-series' | 'bookmarked';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private authService = inject(AuthService);
  private loading = inject(LoadingService);
  private notification = inject(NotificationService);

  private firestore = inject(Firestore);
  private router = inject(Router);

  private mediaCollection = collection(this.firestore, 'media');

  private media$ = defer(() => {
    this.loading.startProcess();
    return collectionData(this.mediaCollection, { idField: 'id' }) as Observable<MediaItem[]>;
  }).pipe(
    tap(() => this.loading.stopProcess()),
    catchError((error) => {
      this.notification.show('Failed to load media. Please try again later.', 'error');
      return of([]);
    }),
    finalize(() => this.loading.stopProcess()),
  );

  private userBookmarks$ = toObservable(this.authService.currentUser).pipe(
    switchMap((user) => {
      if (!user) return of([]);
      const userDoc = doc(this.firestore, `users/${user.uid}`);

      return docData(userDoc).pipe(
        map((data: any) => data?.bookmarked || []),
        catchError((error) => {
          this.notification.show('Failed to load your bookmarks.', 'error');
          return of([]);
        }),
      );
    }),
  );

  private bookmarkedIds = toSignal(this.userBookmarks$, { initialValue: [] });

  private routeFilter$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => event.urlAfterRedirects),
    tap(() => this.searchedWord.set('')),
    startWith(this.router.url),
    map((url) => {
      if (url.includes('/movies')) return 'movies';
      if (url.includes('/tv-series')) return 'tv-series';
      if (url.includes('/bookmarked')) return 'bookmarked';

      return 'movies-tv-series';
    }),
  );

  private filter = toSignal(this.routeFilter$, { initialValue: 'movies-tv-series' as Filter });
  isLoading = this.loading.isLoading;

  searchedWord = signal('');

  title = computed(() => {
    if (this.filter() === 'movies') return 'movies';
    if (this.filter() === 'tv-series') return 'TV series';
    if (this.filter() === 'bookmarked') return 'bookmarked shows';

    return 'movies or TV series';
  });

  private _media = toSignal(this.media$, { initialValue: [] });
  media = computed(() => {
    const rawItems = this._media();
    const myBookmarks = this.bookmarkedIds();
    const currentFilter = this.filter();
    const word = this.searchedWord().toLocaleLowerCase();

    const mergedItems = rawItems.map((item) => ({
      ...item,
      isBookmarked: myBookmarks.includes(item.id),
    }));

    return mergedItems.filter((m) => {
      let section = false;
      if (currentFilter === 'movies') section = m.category === 'Movie';
      else if (currentFilter === 'tv-series') section = m.category === 'TV Series';
      else if (currentFilter === 'bookmarked') section = m.isBookmarked === true;
      else section = true;

      if (!section) return false;
      if (!word) return true;

      return (
        m.title.toLowerCase().includes(word) ||
        m.category.toLowerCase().includes(word) ||
        m.rating.toLowerCase().includes(word) ||
        m.year.toString().includes(word)
      );
    });
  });

  trending = computed(() => this.media().filter((m) => m.isTrending));

  async toggleBookmark(mediaId: string) {
    const user = this.authService.currentUser();

    if (!user) {
      this.router.navigate(['/sign-in']);
      return;
    }

    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    const isCurrentlyBookmarked = this.bookmarkedIds().includes(mediaId);

    try {
      await updateDoc(userDocRef, {
        bookmarked: isCurrentlyBookmarked ? arrayRemove(mediaId) : arrayUnion(mediaId),
      });
    } catch (error) {
      this.notification.show('Failed to update bookmark. Please try again.', 'error');
    }
  }

  getMediaById(id: string): Observable<MediaItem | null> {
    const docRef = doc(this.firestore, `media/${id}`);
    const mediaDoc$ = docData(docRef, { idField: 'id' }) as Observable<MediaItem | undefined>;

    return combineLatest([mediaDoc$, this.userBookmarks$]).pipe(
      map(([media, bookmarks]) => {
        if (!media) return null;

        return {
          ...media,
          isBookmarked: bookmarks.includes(media.id),
        };
      }),
      catchError((error) => {
        this.notification.show('Failed to load movie details.', 'error');
        return of(null);
      }),
    );
  }
}
