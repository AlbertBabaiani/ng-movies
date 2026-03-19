import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

const NAV_LINKS = [
  { path: '/home', label: 'home', altText: 'Home' },
  { path: '/movies', label: 'movies', altText: 'Movies' },
  { path: '/tv-series', label: 'tv-series', altText: 'TV Series' },
  { path: '/bookmarks', label: 'bookmark', altText: 'Bookmarks' },
];

@Component({
  selector: 'header[app-navbar]',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly links = NAV_LINKS;
}
