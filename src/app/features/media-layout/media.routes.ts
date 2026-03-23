import { Routes } from '@angular/router';
import { MediaLayout } from './media-layout';

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
        title: 'Movies',
        loadComponent: () => import('./movies/movies').then((c) => c.Movies),
      },
      {
        path: 'tv-series',
        title: 'TV Series',
        loadComponent: () => import('./tv-series/tv-series').then((c) => c.TvSeries),
      },
      {
        path: 'home',
        title: 'Home',
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
