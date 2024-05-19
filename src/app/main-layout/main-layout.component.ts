import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  constructor(private router: Router, private menuCtrl: MenuController) {}

  async verInicio() {
    await this.router.navigate(['/inicio']);
    this.menuCtrl.close(); // Cerrar el menú
  }

  async verFotos() {
    await this.router.navigate(['/fotos']);
    this.menuCtrl.close(); // Cerrar el menú
  }

  async verGraficos() {
    await this.router.navigate(['/graficos']);
    this.menuCtrl.close(); // Cerrar el menú
  }

  async cerrarSesion() {
    await this.router.navigate(['/login']);
    this.menuCtrl.close(); // Cerrar el menú
  }
}
