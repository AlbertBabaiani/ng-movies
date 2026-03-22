import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MediaService } from '../../core/media-service';

@Component({
  selector: 'section[app-search]',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private service = inject(MediaService);

  title = this.service.title;

  searchValue = this.service.searchedWord;

  updateSearch(value: string) {
    const trimmedSearch = value.trim();

    this.service.searchedWord.set(trimmedSearch);
  }
}
