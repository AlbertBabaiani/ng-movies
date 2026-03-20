import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MediaItem } from '../shared/mediaItem';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private firestore = inject(Firestore);
  private http = inject(HttpClient);

  private mediaCollection = collection(this.firestore, 'media');

  private media$ = collectionData(this.mediaCollection, { idField: 'id' }) as Observable<
    MediaItem[]
  >;

  media = toSignal(this.media$, { initialValue: [] });
}
