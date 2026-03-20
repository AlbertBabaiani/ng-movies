import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'section[app-search]',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  title = input.required<string>();

  search = signal('');

  searchMedia = output<string>();

  enterSearch() {
    const trimmedSearch = this.search().trim();

    if (!trimmedSearch.length) return;

    this.searchMedia.emit(trimmedSearch);
  }
}
