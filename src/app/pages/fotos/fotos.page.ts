import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foto } from 'src/app/models/foto';
import { AuthService } from 'src/app/services/auth.service';
import { BdFotosService } from 'src/app/services/bd-fotos.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {
  fotos: Foto[] = [];
  filtro: string = '';
  usuarioActual: string; // Vamos a tratar al usuarioActual sólo por su correo

  constructor(private bdFotosService: BdFotosService, private auth: AuthService) {
    this.usuarioActual = this.auth.getCurrentUserEmail()!;
  }

  // Cuando se carga por primera vez la página, cargo las fotos
  ngOnInit() {
    this.cargarFotos();
    this.usuarioActual = this.auth.getCurrentUserEmail()!;
  }

  // Cada vez que se abre la página, cargo las fotos
  ionViewWillEnter() {
    this.cargarFotos(this.filtro);
  }

  async cargarFotos(tipo?: string) {
    this.fotos = await this.bdFotosService.obtenerFotos(tipo);
  }

  onFiltroChange(event: any) {
    this.filtro = event.detail.value;
    console.log('El filtro es: ' + this.filtro);
    this.cargarFotos(this.filtro);
  }

  /*
  async votar(foto: Foto) {
    if (this.usuarioActual) {
      await this.bdFotosService.votarFoto(foto.id!, this.usuarioActual);
      await this.cargarFotos();
    }
  }
  */

  async votar(foto: Foto) {
    if (this.usuarioActual) {
      await this.bdFotosService.votarFoto(foto.id!, this.usuarioActual);

      // Actualizo los datos de la foto votada en el array `fotos` sin recargar toda la lista
      const index = this.fotos.findIndex(f => f.id === foto.id);
      if (index !== -1) {
        this.fotos[index].votos += 1;
        this.fotos[index].votantes.push(this.usuarioActual);
      }
    }
  }

  haVotado(foto: Foto): boolean {
    if (!foto.votantes) {
      foto.votantes = []; // Inicializo como un array vacío si es undefined
    }
    return foto.votantes && foto.votantes.includes(this.usuarioActual);
  }
}
