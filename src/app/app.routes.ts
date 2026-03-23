import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./features/home/home').then((c) => c.Home),
  },
  {
    path: 'movies',
    title: 'Movies',
    loadComponent: () => import('./features/movies/movies').then((c) => c.Movies),
  },
  {
    path: 'tv-series',
    title: 'TV Series',
    loadComponent: () => import('./features/tv-series/tv-series').then((c) => c.TvSeries),
  },
  { path: 'auth', loadComponent: () => import('./features/auth/auth').then((c) => c.Auth) },
  {
    path: '**',
    redirectTo: 'home',
  },
];
