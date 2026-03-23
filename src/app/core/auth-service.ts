import { inject, Injectable, signal } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  currentUser = signal<User | null | undefined>(undefined);

  constructor() {
    authState(this.auth)
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.currentUser.set(user);
      });
  }

  async register(email: string, password: string) {
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
    }
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return signOut(this.auth);
  }
}
