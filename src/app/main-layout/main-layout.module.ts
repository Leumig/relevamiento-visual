import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [MainLayoutComponent],
  exports: [MainLayoutComponent] // Exporta el componente si lo vas a usar en otros módulos
})
export class MainLayoutModule {}
