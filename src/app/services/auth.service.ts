import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'; // Importa los elementos necesarios desde AngularFire

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFirebase: Auth) { }

  login(correo: string, clave: string) {
    return signInWithEmailAndPassword(this.authFirebase, correo, clave);
  }
}