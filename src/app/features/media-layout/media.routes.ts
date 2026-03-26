import { Routes } from '@angular/router';
import { MediaLayout } from './media-layout';
import { authGuard } from '../../core/guards/auth-guard';

export const MEDIA_ROUTES: Routes = [
  {
    path: '',
    component: MediaLayout,

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'movies',
        title: 'Movies - NG Movies',
        loadComponent: () => import('./movies/movies').then((c) => c.Movies),
      },
      {
        path: 'tv-series',
        title: 'TV Series - NG Movies',
        loadComponent: () => import('./tv-series/tv-series').then((c) => c.TvSeries),
      },
      {
        path: 'bookmarked',
        title: 'Bookmarks - NG Movies',
        canMatch: [authGuard],
        loadComponent: () => import('./bookmarks/bookmarks').then((c) => c.Bookmarks),
      },
      {
        path: 'home',
        title: 'Home - NG Movies',
        loadComponent: () => import('./home/home').then((c) => c.Home),
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
