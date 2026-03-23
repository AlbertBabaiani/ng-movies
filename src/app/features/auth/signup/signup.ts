import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  repeatPassword = signal('');
  showPassword = signal(false);

  emailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email().trim()) && this.email().length >= 3;
  });

  passwordStatus = computed(() => {
    const p = this.password();
    return {
      length: p.length >= 6,
      hasUpper: /[A-Z]/.test(p),
      hasNumber: /[0-9]/.test(p),
      noSpace: p.length > 0 && !/\s/.test(p),
    };
  });

  isFormValid = computed(
    () =>
      this.emailValid() &&
      Object.values(this.passwordStatus()).every((v) => v) &&
      this.password() === this.repeatPassword(),
  );

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  async onSubmit() {
    try {
      if (this.password() !== this.repeatPassword()) {
        return;
      }

      await this.authService.register(this.email(), this.password());

      this.router.navigate(['/home']);
    } catch (err) {}
  }
}
