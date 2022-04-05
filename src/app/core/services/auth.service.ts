import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

    private signInWithEmail({ email, password }): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({ email, password, name }): Promise<auth.UserCredential>{
    return this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(credentials =>
      credentials.user
        .updateProfile({displayName : name, photoURL : null })
        .then(() => credentials)
    );
  }

}
