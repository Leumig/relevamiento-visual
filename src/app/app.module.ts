import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutModule } from './main-layout/main-layout.module';

// Importa los módulos de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MainLayoutModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: 'AIzaSyCBPgr-wID5aqI7efvp4v2Hn1OjE3V3gco',
      authDomain: 'pps-primer-parcial-2024.firebaseapp.com',
      projectId: 'pps-primer-parcial-2024',
      storageBucket: 'pps-primer-parcial-2024.appspot.com',
      messagingSenderId: '37093937710',
      appId: '1:37093937710:android:86f5e808d7ecc1df3ec5bf'
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }