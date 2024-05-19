import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { BdFotosService } from '../../services/bd-fotos.service';
import { BdUsuariosService } from 'src/app/services/bd-usuarios.service';
import { StorageService } from 'src/app/services/storage.service';
import { Foto } from 'src/app/models/foto';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, AfterViewInit {
  imageUrl: string | undefined;
  fotoTomada: boolean = false;
  usuarioActual: Usuario | null | undefined = null;
  downloadURL: string | undefined;
  isToastOpen = false; // Estado bool del toast que indica que se publicó la foto
  mensajeToast = ''; // Mensaje del toast que indica que se publicó la foto
  toastBienvenida = false; // Estado bool del toast que da la bienvenida

  constructor(
    private router: Router,
    private storage: StorageService,
    private bdFotos: BdFotosService,
    private auth: AuthService,
    private bdUsuarios: BdUsuariosService
  ) {}

  ngOnInit() {
    this.cargarUsuarioActual();
    // Apenas inicia la página, me traigo al usuario logeado
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.toastBienvenida = true;
    }, 1250);
    // Una vez se carguen todos los elementos, muestro el toastBienvenida
  }


  // Función que me trae al usuario actual logeado
  async cargarUsuarioActual() {
    const correoABuscar = this.auth.getCurrentUserEmail();
    if (correoABuscar) {
      this.usuarioActual = await this.bdUsuarios.getUsuarioPorCorreo(correoABuscar);
      console.log(this.usuarioActual);
    }
    // Primero tomo el correo, y después voy a buscar a la BD el usuario al que le corresponda
  }


  // Función que obliga a esperar a que se obtenga el usuario, antes de continuar
  async esperarUsuarioCargado() {
    while (!this.usuarioActual) {
      await new Promise(resolve => setTimeout(resolve, 100));
      // Hasta que usuarioActual deje de ser null o indefined, no termina el bucle (lo intenta cada 100ms)
    }
  }


  // Función que realiza todo el proceso de tomar la foto y publicarla
  async tomarFoto(tipo: string) {
    try {
      await this.esperarUsuarioCargado(); 
      // Me aseguro de que el usuario esté cargado antes de continuar

      const foto = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Camera,
        resultType: CameraResultType.Uri
      });
      // Tomo la foto con la cámara

      this.imageUrl = foto.webPath;
      // Me guardo su url web

      if (this.imageUrl && this.usuarioActual) {
        this.downloadURL = await this.subirFoto(this.imageUrl);
        await this.guardarDatosFoto(tipo);
        this.mostrarToast('¡Foto subida correctamente!');
        // Subo la foto a Storage, y me guardo la URL que haya generado
      } else {
        this.mostrarToast('Error: Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }


  // Función que sube la foto a Storage y devuelve la URL generada (es un pasamanos)
  async subirFoto(fileUri: string): Promise<string> {
    try {
      const downloadURL = await this.storage.subirImagen(fileUri);
      console.log('Foto subida con éxito:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error al subir la foto:', error);
      throw error;
    }
  }


  // Función que sube los datos de la foto a Firestore (es un pasamanos)
  async guardarDatosFoto(tipo: string) {
    if (this.downloadURL && this.usuarioActual) {
      const nombreFoto: string = `${tipo}_${this.usuarioActual.nombreUsuario}_${new Date().getTime()}`;
      const fecha = Timestamp.fromDate(new Date());
      const foto = new Foto(this.downloadURL, nombreFoto, tipo, fecha, this.usuarioActual.nombreUsuario, 0);
      await this.bdFotos.guardarFoto(foto);
      // Creamos un nombre con un número aleatorio, tomamos la fecha, y con eso creamos el objeto Foto
      // Ese objeto Foto, es el que vamos a mandar a guardar a la BD Firestore
    }
  }


  // Función que muestra el toast de la captura de la foto
  mostrarToast(mensaje: string) {
    this.isToastOpen = true;
    this.mensajeToast = mensaje;
  }
}
