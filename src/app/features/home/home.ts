import { Component, inject } from '@angular/core';
import { Recommendation } from './recommendation/recommendation';
import { MediaService } from '../../core/media-service';

@Component({
  selector: 'app-home',
  imports: [Recommendation],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private mediaService = inject(MediaService);
}
