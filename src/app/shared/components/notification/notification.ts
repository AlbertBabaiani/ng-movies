import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/notification-service';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {
  private notificationService = inject(NotificationService);

  type = this.notificationService.type;
  isVisible = this.notificationService.isVisible;

  message = this.notificationService.message;

  close() {
    this.notificationService.close();
  }
}
