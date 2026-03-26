import { Routes } from '@angular/router';
import { unauthGuard } from './core/guards/unauth-guard';

export const routes: Routes = [
  {
    path: 'sign-up',
    title: 'Sign Up - NG Movies',
    canMatch: [unauthGuard],
    loadComponent: () => import('./features/auth/signup/signup').then((c) => c.Signup),
  },
  {
    path: 'sign-in',
    title: 'Sign In - NG Movies',
    canMatch: [unauthGuard],
    loadComponent: () => import('./features/auth/signin/signin').then((c) => c.Signin),
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/features/media-layout/media.routes').then((r) => r.MEDIA_ROUTES),
  },
];
