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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

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
    } catch (error) {
      console.error('Registration failed', error);
      // Todo: add errors
      throw error;
    } finally {
      this.loading.stopProcess(); // 4. Always stop Spinner
    }
  }

  async login(email: string, password: string) {
    this.loading.startProcess();
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } finally {
      this.loading.stopProcess();
    }
  }

  async logout() {
    this.loading.startProcess();
    try {
      return await signOut(this.auth);
    } finally {
      this.loading.stopProcess();
    }
  }
}
