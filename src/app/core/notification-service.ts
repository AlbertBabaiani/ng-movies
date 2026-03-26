import { Injectable, signal } from '@angular/core';

export type NotificationType = 'error' | 'success';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message = signal('');
  type = signal<NotificationType>('error');
  isVisible = signal(false);

  private timeoutRef: any;

  show(message: string, type: NotificationType = 'error') {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }

    this.message.set(message);
    this.type.set(type);
    this.isVisible.set(true);

    this.timeoutRef = setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.isVisible.set(false);
  }
}
