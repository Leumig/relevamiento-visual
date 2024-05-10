import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importa los módulos de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat'; // Importa AngularFireModule en lugar de AngularFireAppModule
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Importa AngularFireAuthModule
import { getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // Proporciona la aplicación Firebase
    provideFirebaseApp(() => initializeApp({
      apiKey: 'AIzaSyCBPgr-wID5aqI7efvp4v2Hn1OjE3V3gco',
      authDomain: 'pps-primer-parcial-2024.firebaseapp.com',
      projectId: 'pps-primer-parcial-2024',
      storageBucket: 'pps-primer-parcial-2024.appspot.com',
      messagingSenderId: '37093937710', // El número de proyecto se utiliza como el ID del remitente de mensajes (Messaging Sender ID)
      appId: '1:37093937710:android:1ef77a0f55b73bd53ec5bf'
    })),
    // Proporciona el servicio de autenticación de Firebase
    provideAuth(() => getAuth()),
    // Importa los módulos de AngularFire
    AngularFireModule, // Importa AngularFireModule
    AngularFireAuthModule // Importa AngularFireAuthModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
