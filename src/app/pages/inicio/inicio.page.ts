import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router) {}
  tema: string = 'animales';
  idioma: string = 'español';

  cerrarSesion() {
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
    console.log('inicio');
  }

  cambiarTema(nuevoTema: string) {
    this.tema = nuevoTema;
  }

  cambiarIdioma(nuevoIdioma: string) {
    this.idioma = nuevoIdioma;
  }

  generarSonido(sonido: string) {
    let audio = new Audio();
    audio.src = `../../../assets/sounds/${this.tema}/${this.idioma}/${sonido}.mp3`;
    audio.play();
  }
}