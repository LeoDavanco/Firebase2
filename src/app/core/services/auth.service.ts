import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { FacebookAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthProvider, User } from './auth.types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<any>;

  constructor( private afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(map((user => user !== null)));
  }

  authenticate({ isSignIn, provider, user }): Promise<any> {

    let operation: Promise<any>;

    if (provider !== AuthProvider.Email) {
      operation = this.signInWithPopup(provider);
    }else{
      operation = isSignIn ? this.signInWithEmail(user) : this.signUpWithEmail(user);
    }
    return operation;
  }

  logout(): Promise<any> {
    return this.afAuth.signOut();
  }

    private signInWithEmail({ email, password }: User): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({ email, password, name }): Promise<any>{
    return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then(credentials =>
      credentials.user
        .updateProfile({displayName : name, photoURL : null })
        .then(() => credentials)
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  signInWithPopup(provider: any): Promise<any> {
    let signInProvider = null;

    switch (provider) {
      case 'facebook':
        signInProvider = new FacebookAuthProvider();
        break;
    }
    return this.afAuth.signInWithPopup(signInProvider);
  }


}
