import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loadingCount = signal(0);

  readonly isLoading = computed(() => this._loadingCount() > 0);

  startProcess() {
    this._loadingCount.update((v) => v + 1);
  }

  stopProcess() {
    this._loadingCount.update((v) => Math.max(0, v - 1));
  }
}
