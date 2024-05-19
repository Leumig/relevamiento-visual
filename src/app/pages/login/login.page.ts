import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { minLengthValidator, emailValidator } from '../../validations/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  correoActual: string = '';
  claveActual: string = '';
  errorInicioSesion: boolean = false;
  mensajeError: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async ingresar(correoActual: string, claveActual: string) {
    console.log('Correo actual recibido: ' + correoActual);
    console.log('Clave actual recibida: ' + claveActual);

    if (!correoActual || !claveActual) {
      this.mostrarError('Por favor, complete ambos campos.');
      return;
    }

    if (!this.correoActual || !this.claveActual) {
      this.mostrarError('Por favor, complete ambos campos.');
      return;
    }

    if (!emailValidator(this.correoActual)) {
      this.mostrarError('El correo electrónico no es válido.');
      return;
    }

    if (!minLengthValidator(this.claveActual, 6)) {
      this.mostrarError('La clave debe tener al menos 6 caracteres.');
      return;
    }

    try {
      await this.authService.login(correoActual, claveActual);
      console.log('Inicio de sesión exitoso');

      this.correoActual = '';
      this.claveActual = '';
      this.errorInicioSesion = false;
      this.mensajeError = '';

      this.router.navigate(['/inicio']);
    } catch (error) {
      console.log('Error durante el inicio de sesión:', error);
      this.mostrarError('Correo o clave incorrectos.');
    }
  }

  mostrarError(mensaje: string) {
    this.errorInicioSesion = true;
    this.mensajeError = mensaje;
  }

  autocompletar(usuario: string)
  {
    if (usuario === '1') {
      this.correoActual = 'junmigue7@gmail.com';
      this.claveActual = '111111';
    } else if (usuario === '2') {
      this.correoActual = 'pepe@gmail.com';
      this.claveActual = '111111';
    } else {
      this.correoActual = 'lolo@gmail.com';
      this.claveActual = '111111';
    }
  }
}
