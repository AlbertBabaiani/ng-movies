import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Search } from '../../components/search/search';

@Component({
  selector: 'app-media-layout',
  imports: [RouterOutlet, Navbar, Search],
  templateUrl: './media-layout.html',
  styleUrl: './media-layout.scss',
})
export class MediaLayout {}
