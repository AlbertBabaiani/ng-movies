import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [FormsModule, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {
  private authService = inject(AuthService);

  email = signal('');
  password = signal('');
  showPassword = signal(false);

  authError = signal('');

  emailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email().trim()) && this.email().length >= 3;
  });

  isFormValid = computed(() => this.emailValid() && this.password().length > 0);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  clearAuthError() {
    if (this.authError()) this.authError.set('');
  }

  async onSubmit() {
    this.authError.set('');

    if (!this.isFormValid()) return;

    try {
      await this.authService.login(this.email(), this.password());
    } catch (err: any) {
      this.authError.set('Invalid email or password');
    }
  }
}
