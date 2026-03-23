import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-up',
    title: 'Sign Up - NG Movies',
    loadComponent: () => import('./features/auth/signup/signup').then((c) => c.Signup),
  },
  {
    path: 'sign-in',
    title: 'Sign In - NG Movies',
    loadComponent: () => import('./features/auth/signin/signin').then((c) => c.Signin),
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/features/media-layout/media.routes').then((r) => r.MEDIA_ROUTES),
  },
];
