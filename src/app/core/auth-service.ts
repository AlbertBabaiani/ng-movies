import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { LoadingService } from './loading-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  private loading = inject(LoadingService);

  currentUser = signal<User | null | undefined>(undefined);

  isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    authState(this.auth)
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.currentUser.set(user);
      });
  }

  async register(email: string, password: string) {
    this.loading.startProcess();
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        email: user.email,
        bookmarked: [],
      });
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Registration failed', error);
      // Todo: add errors
      throw error;
    } finally {
      this.loading.stopProcess();
    }
  }

  async login(email: string, password: string) {
    this.loading.startProcess();
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);

      this.router.navigate(['/home']);
      return result;
    } finally {
      this.loading.stopProcess();
    }
  }

  async logout() {
    this.loading.startProcess();
    try {
      await signOut(this.auth);

      this.router.navigate(['/sign-in']);
    } catch (error) {
      console.error('Logout failed', error);
      throw error;
    } finally {
      this.loading.stopProcess();
    }
  }
}
