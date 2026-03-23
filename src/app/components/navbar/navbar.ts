import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth-service';

const NAV_LINKS = [
  { path: '/home', label: 'home', altText: 'Home' },
  { path: '/movies', label: 'movies', altText: 'Movies' },
  { path: '/tv-series', label: 'tv-series', altText: 'TV Series' },
  { path: '/bookmarked', label: 'bookmark', altText: 'Bookmarks' },
];

@Component({
  selector: 'header[app-navbar]',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly links = NAV_LINKS;

  private service = inject(AuthService);

  isMenuOpen = signal(false);

  userEmail = computed(() => this.service.currentUser()?.email ?? 'Guest');

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  async logout() {
    this.closeMenu();

    await this.service.logout();
  }
}
