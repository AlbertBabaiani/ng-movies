import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLogin = signal(true);

  email = signal('');
  password = signal('');
  repeatPassword = signal('');

  errorMessage = signal('');

  toggleMode() {
    this.isLogin.set(!this.isLogin());
    this.errorMessage.set('');
  }

  async onSubmit() {
    this.errorMessage.set('');

    try {
      if (this.isLogin()) {
        await this.authService.login(this.email(), this.password());
      } else {
        if (this.password() !== this.repeatPassword()) {
          this.errorMessage.set('Passwords do not match!');
          return;
        }
        await this.authService.register(this.email(), this.password());
      }

      this.router.navigate(['/home']);
    } catch (err: any) {
      this.errorMessage.set(err.message);
    }
  }
}
